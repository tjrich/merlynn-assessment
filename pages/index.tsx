// T RICH
// MERLYNN CODING ASSESSMENT

import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import Input from '../components/Input'

const Home: NextPage = () => {

  // State to store some information received from the API endpoint
  let [apiData, setApiData] = useState({
    name: "",
    questions: [],
    domain: [],
  })

  // To store decision made by the model
  let [decision, setDecision] = useState({
    decision: ""
  })
  
  let [error, setError] = useState({})

  // JSON message to be sent to the API decision endpoint
  // Input values need to be populated based on user's answers
  let toPost = {
    "data": {
      "type": "scenario",
      "attributes": {
        // "input": [20, "Male", 24, "No", "Morning", "NA", "No", 1, 0]
        "input": []
      }
    }
  }

  useEffect(() => {
    // API call made to retrieve questions and possible answers
    fetch('https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12', {
      method: 'GET',
      headers: { 
        'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979', 
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then(response => response.json())
    .then(data => setApiData({
      name: data.data.attributes.name, // Stores name of the model
      questions: data.data.attributes.metadata.attributes, // Stores questions of the model
      domain: data.data.attributes.metadata.attributes.domain, // Stores domain for each question
                                                              // This contains possible answers, range, etc.
    }))
    .catch(err => setError(err))
  }, [])

  // POST request to be made with user's answers
  // API endpoint replies with a decision --> in this case a drink recommendation
  const submit = (e: any) => {
    e.preventDefault()
    fetch('https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12', {
      method: 'POST',
      headers: { 
        'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979', 
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(toPost)
    })
    .then(response => response.json())
    // .then(res => console.log(res))
    .then(data => setDecision({
      decision: data.data.attributes.decision, // Stores the decision made by the model
    }))
  }

  return (
    <>
    <div className="w-full h-full">
      <Head>
        <title>T Rich - Coding Assessment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
      
      <h1 className="text-lg mx-8 font-semibold pt-5 mt-20 text-center border-2 p-4 rounded-lg shadow-md
                      hover:border-blue-400 transition-all ease-in-out">
        {/* Retrieve model name and displays it */}
        Model Name: {apiData.name} 
      </h1>

      
      <form 
        // onSubmit={submit}
        className="grid mx-8 my-4 border-2 p-4 rounded-lg shadow-md hover:border-blue-400
                        transition-all ease-in-out">
        {
          apiData.questions.length > 0 ? 
          (apiData.questions.map(data => // Loops through all the model questions
            <Input                       // and populates the labels + input fields
              key={data['name']}
              id={data['name']}
              question={data['question']}
              type={data['type']}
              values={data['domain']['values']}
              lower={data['domain']['lower']}
              upper={data['domain']['upper']}
            />
          ))
          : 
          ('Loading API data...') // Placeholder to be shown when waiting on a response from the API
        }
        <button 
                // onSubmit={(e) => submit(e)}
                className="bg-blue-500 text-white ml-4 mt-4 font-semibold text-lg w-24 rounded-xl
                              hover:shadow-xl transition-all ease-in-out active:scale-95">
          Submit
        </button>
      </form>

      <div className="mx-8 my-5 border-2 p-4 rounded-lg shadow-md hover:border-blue-400
                      transition-all ease-in-out">
        {/* Shows the decision made by the model */}
        <h1 className="text-lg font-semibold">
          Decision: {decision['decision']!="" ? (decision['decision']) : ("Awaiting API response...") }
        </h1>
      </div>
    </div>
    </>
  )
}

export default Home


