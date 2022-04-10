import React from 'react'
import { useState, useEffect } from 'react'

interface Props {
  question: string,
  type: string
}

const Input: React.FC<Props> = ({question, type}) => {

  let [inputType, setInputType] = useState("text")

  useEffect(() => {
    if(type=="Continuous"){
      setInputType("number")
    }
    else {
      setInputType("text")
    }
  })
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
          className="flex items-center pl-2 border-2 rounded-xl mt-1 shadow-sm"
          type={inputType}>

        </input>
      </div>
      
    </div>
  )
}

export default Input