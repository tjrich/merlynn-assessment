import React from 'react'

interface Props {
  question: string,
  type: string
}

const Form: React.FC<Props> = ({question, type}) => {
  return (
    <form>
      
      <div className="flex">
        {/* Question --> gets question from API */}
        <label>
          {question}
        </label>

        {/* Input --> gets input type from API 
            If question type == Nominal, <input type="text">
            If question type == Continuos, <input type="number">
        */}
        <input type={type}>

        </input>
      </div>
      
    </form>
  )
}

export default Form