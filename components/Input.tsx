import React from 'react'
import { useState, useEffect } from 'react'

interface Props {
  question: string,
  type: string,
  values: any,
  lower: number,
  upper: number,
  id: string,
}

const Input: React.FC<Props> = ({question, type, values, lower, upper, id}) => {

  let [apiInfo, setApiInfo] = useState({
    type: "",
    values: [],
    lower: -10,
    upper: 90
  })

  let [inputs, setInputs] = useState({})

  useEffect(() => {
    if(type=="Continuous"){
      setApiInfo({
        type: "number",
        values: [],
        lower: lower,
        upper: upper
      })
    }
    else {
      setApiInfo({
        type: "text",
        values: values,
        lower: 0,
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

  // const handle = (e: string) => {
  //   let dataObj = {}
  //   dataObj[e.target.id] = e.target.value
  //   // const newdata = {...inputs}
  //   // newdata[e.target.id] = e.target.value
  //   // setInputs(e.target.id = e.target.value)
  //   // console.log(newdata)
  //   console.log(dataObj)
  // }
  
  return (
    <div className="w-full px-4">
      
      <div className="flex items-center">

        <div className="w-1/2">
          <label className="text-md font-semibold">
            {question}
          </label>
        </div>

        <div className="w-full">
        
          {apiInfo.type == "number" ? 
            (
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
              <select
                // onChange={(e: any) => console.log(e.target.value)}
                // onChange={(e: any) => handle(e)}
                className="flex items-center border-2 rounded-xl mt-1 mb-2 pl-1 w-1/4" 
                name={id} 
                id={id}>
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