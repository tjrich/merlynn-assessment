import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import Input from '../components/Input'

const Home: NextPage = () => {

  let [apiData, setApiData] = useState({
    name: "",
    questions: [],
    domain: [],
  })

  let [decision, setDecision] = useState({
    decision: ""
  })
  // let [inputs, setInputs] = useState([])
    // "INPUTVAR1": 0,
    // "INPUTVAR2": "",
    // "INPUTVAR3": 0,
    // "INPUTVAR4": "",
    // "INPUTVAR5": "",
    // "INPUTVAR6": "",
    // "INPUTVAR7": "",
    // "INPUTVAR8": 0,
    // "INPUTVAR9": 0
  
  let [error, setError] = useState({})

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
    fetch('https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12', {
      method: 'GET',
      headers: { 
        'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979', 
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then(response => response.json())
    .then(data => setApiData({
      name: data.data.attributes.name,
      questions: data.data.attributes.metadata.attributes,
      domain: data.data.attributes.metadata.attributes.domain,
    }))
    .catch(err => setError(err))
  }, [])

  // function handle(e: any){
  //   // const newdata = {...inputs}
  //   {...inputs, e.target.id} = e.target.value
  //   // newdata[e.target.id] = e.target.value
  //   // setInputs(newdata)
  //   setInputs({...inputs, e.target.id = e.target.value})
  //   console.log(newdata)
  // }

  // const handleChange = (e: any) => {
  //   setInputs({
  //     ...inputs = e.target.value
  //   })
  // }

  // const handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   console.log(inputs)
  // }

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
      decision: data.data.attributes.decision,
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
        Model Name: {apiData.name}
      </h1>

      
      <form 
        onSubmit={submit}
        className="grid mx-8 my-4 border-2 p-4 rounded-lg shadow-md hover:border-blue-400
                        transition-all ease-in-out">
        {
          apiData.questions.length > 0 ? 
          (apiData.questions.map(data =>
            <Input
              // onChange={(e: any) => handle(e)}
              // onChange={(e: any) => console.log(e.target.value)}
              // value={inputs[data['name']]}
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
          ('Loading API data...')
        }
        <button 
                onSubmit={(e) => submit(e)}
                className="bg-blue-500 text-white ml-4 mt-4 font-semibold text-lg w-24 rounded-xl
                              hover:shadow-xl transition-all ease-in-out active:scale-95">
          Submit
        </button>
      </form>

      <div className="mx-8 my-5 border-2 p-4 rounded-lg shadow-md hover:border-blue-400
                      transition-all ease-in-out">
        <h1 className="text-lg font-semibold">
          Decision: {decision['decision']!="" ? (decision['decision']) : ("Awaiting API response...") }
        </h1>
      </div>
    </div>
    </>
  )
}

export default Home


