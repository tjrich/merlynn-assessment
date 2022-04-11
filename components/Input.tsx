// T RICH
// MERLYNN CODING ASSESSMENT

import React from 'react'
import { useState, useEffect } from 'react'

interface Props { // Defines props and their types
  question: string,
  type: string,
  values: any,
  lower: number,
  upper: number,
  id: string,
}

const Input: React.FC<Props> = ({question, type, values, lower, upper, id}) => {

  // Declare State to store important information, passed via props
  let [apiInfo, setApiInfo] = useState({
    type: "",
    values: [],
    lower: -10,
    upper: 90
  })

  let [inputs, setInputs] = useState({})

  useEffect(() => {
    // Checks the type of model question
    if(type=="Continuous"){
      setApiInfo({
        type: "number", // Sets type which will be used for HTML input
        values: [], // DomainR questions have no predetermined answers
        lower: lower,
        upper: upper
      })
    }
    else {
      setApiInfo({
        type: "text", // Sets type which will be used for HTML input
        values: values, // Stores predetermined answers for model question
        lower: 0, // Randomly chosen values, only applicable to DomainR questions
        upper: 20
      })
    }
  }, [])

  const handleChange = (e: any) => {
    setInputs({
      ...inputs// = e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(inputs)
  }
  
  return (
    <div className="w-full px-4">
      
      <div className="flex items-center">

        <div className="w-1/2">
          <label className="text-md font-semibold">
            {question}
          </label>
        </div>

        <div className="w-full">
        
          {/* Conditional rendering for HTML input type */}
          {/* If question.type == "Continuous" --> HTML input type="number" */}
          {/* If question.type == "Nominal" --> HTML input type="text" */}
          {apiInfo.type == "number" ? 
            (
              // HTML input type="number"
              <input
                // onChange={(e: any) => console.log(e.target.value)}
                // onChange={(e: any) => handle(e)}
                className="flex items-center pl-2 border-2 rounded-xl mt-1 mb-2 shadow-sm w-1/4"
                id={id}
                type={apiInfo["type"]}
                min={apiInfo["lower"]}
                max={apiInfo["upper"]}
                placeholder={String(apiInfo["lower"])}
              >
              </input> 
            )
            :
            ( 
              // HTML input type="text"
              <select
                // onChange={(e: any) => console.log(e.target.value)}
                // onChange={(e: any) => handle(e)}
                className="flex items-center border-2 rounded-xl mt-1 mb-2 pl-1 w-1/4" 
                name={id} 
                id={id}>
                {/* Populates dropdown list with predetermined model answers */}
                {
                  apiInfo['values'].map(value =>
                    <option
                      key={value}
                      id={id}
                      value={value}
                    >
                      {value}
                    </option>
                  )
                }
              </select>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Input