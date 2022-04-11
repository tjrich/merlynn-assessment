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