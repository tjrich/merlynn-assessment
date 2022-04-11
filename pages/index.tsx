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
    id: []
  })
  // let [inputs, setInputs] = useState({
  //   "INPUTVAR1": 0,
  //   "INPUTVAR2": "",
  //   "INPUTVAR3": 0,
  //   "INPUTVAR4": "",
  //   "INPUTVAR5": "",
  //   "INPUTVAR6": "",
  //   "INPUTVAR7": "",
  //   "INPUTVAR8": 0,
  //   "INPUTVAR9": 0,
  // })
  let [error, setError] = useState({})

  let toPost = {
    "data": {
      "type": "scenario",
      "attributes": {
        "input": [20, "Male", 24, "No", "Morning", "NA", "No", 1, 0]
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
      id: data.data.attributes.metadata.attributes.name
    }))
    .catch(err => setError(err))
  }, [])

  // function handle(e){
  //   const newdata = {...inputs}
  //   newdata[e.target.id] = e.target.value
  //   setInputs(newdata)
  //   console.log(newdata)
  // }

  async function submit(e){
    e.preventDefault()
    await fetch('https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12', {
      method: 'POST',
      headers: { 
        'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979', 
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(toPost)
    })
    .then(response => response.json())
    .then(res => console.log(res))
  }

  return (
    <>
    <div className="w-full h-full">
      <Head>
        <title>T Rich - Coding Assessment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
      
      <h1 className="text-lg font-semibold pt-5 pl-4 py-2 mt-14">
        Model Name: {apiData.name}
      </h1>

      
      <form className="grid md:grid-cols-3 grid-cols-2 mx-8 my-5">
        {
          apiData.questions.length > 0 ? 
          apiData.questions.map(data =>
            // console.log(data)

            <Input
              // onChange={(e) => handle(e)}
              // value={inputs[{data.name}]}
              key={data['name']}
              id={data['name']}
              question={data['question']}
              type={data['type']}
              values={data['domain']['values']}
              lower={data['domain']['lower']}
              upper={data['domain']['upper']}
            />
          )
          : ('Loading API data...')
        }
        <button 
                // onSubmit={(e) => submit(e)}
                className="bg-blue-500 text-white ml-4 mt-4 font-semibold text-lg w-24 rounded-xl
                              hover:shadow-xl transition-all ease-in-out active:scale-95">
          Submit
        </button>
      </form>
    </div>
    </>
  )
}

export default Home


