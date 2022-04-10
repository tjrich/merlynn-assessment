import React from 'react'

interface Props {
  question: string,
  type: string
}

const Input: React.FC<Props> = ({question, type}) => {
  return (
    <div className="w-full px-4 py-4">
      
      <div className="flex items-center">

        {/* Question --> gets question from API */}
        <label className="text-lg font-semibold mr-4">
          {question}
        </label>

        {/* Input --> gets input type from API 
            If question type == Nominal, <input type="text">
            If question type == Continuos, <input type="number">
        */}
        <input
          className="flex items-center border-2 rounded-xl py-1 px-2 shadow-sm"
          type={type}>

        </input>
      </div>
      
    </div>
  )
}

export default Input