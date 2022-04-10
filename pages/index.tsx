import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import Input from '../components/Input'

const Home: NextPage = () => {

  let [inputType, setInputType] = useState("text")
  let [apiData, setApiData] = useState({
    name: "",
    questions: [],
    // questonsType: []
  })
  let [error, setError] = useState({})

  useEffect(() => {
    fetch('https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12', {
      method: 'GET',
      headers: { 
        'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979', 
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then(response => response.json())
    // .then(response => console.log(response.data.attributes.metadata.attributes))
    .then(data => setApiData({
      name: data.data.attributes.name,
      questions: data.data.attributes.metadata.attributes,
      // questonsType: data.data.attributes.metadata.attributes.type
    }))
    .catch(err => setError(err))
  }, [])

  
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

      <div className="grid md:grid-cols-3 grid-cols-2 mx-8 my-5">
        {
          apiData.questions.length > 0 ? 
          apiData.questions.map(data =>
            // { 
              // console.log(data)

                <Input
                  key={data['name']}
                  question={data['question']}
                  type={data['type']}//{(data['type']=='Continuos') ? "number" : "text"}
                />
            // }
          )
          : ('Loading API data...')
        }
      </div>
    </div>
    </>
  )
}

export default Home


