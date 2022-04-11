import React from 'react'
import { useState, useEffect } from 'react'

interface Props {
  question: string,
  type: string,
  values: Array<string>,
  lower: number,
  upper: number,
  id: string
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

        {/* Question --> gets question from API */}
        <label className="text-md font-semibold">
          {question}
        </label>

        {/* Input --> gets input type from API 
            If question type == Nominal, <input type="text">
            If question type == Continuous, <input type="number">
        */}
        <input
          className="flex items-center pl-2 border-2 rounded-xl mt-1 mb-2 shadow-sm"
          id={id}
          type={apiInfo["type"]}
          min={apiInfo["lower"]}
          max={apiInfo["upper"]}
        >
          
        </input>
      </div>
      
    </div>
  )
}

export default Input