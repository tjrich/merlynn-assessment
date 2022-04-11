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
      
      <div className="items-center">

      <label className="text-md font-semibold">
        {question}
      </label>

      {apiInfo.type == "number" ? 
        (
          <input
            className="flex items-center pl-2 border-2 rounded-xl mt-1 mb-2 shadow-sm"
            id={id}
            type={apiInfo["type"]}
            min={apiInfo["lower"]}
            max={apiInfo["upper"]}
          >
          </input> 
        )
        :
        ( 
          <select name={id} id={id}>
            {
              apiInfo['values'].map(value =>
                <option key={value} id={id} value={value} defaultValue={value}>{value}</option>
              )
            }
          </select>
        )
      }
      </div>
    </div>
  )
}

export default Input