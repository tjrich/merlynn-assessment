import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import axios from "axios"
import { useState, useEffect } from 'react'
import Input from '../components/Input'

const Home: NextPage = () => {

  let [inputType, setInputType] = useState("")
  let [apiData, setApiData] = useState({
    name: "",
    questions: [],
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
      questions: data.data.attributes.metadata.attributes
    }))
    .catch(err => setError(err))
  }, [])

  
  return (
    
    <>
    <div className="w-full">
      <Head>
        <title>T Rich - Coding Assessment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
      
      <h1 className="text-lg font-semibold pl-2 py-2">
        Model Name: {apiData.name}
      </h1>
      {
        apiData.questions.length > 0 ? 
        apiData.questions.map(data =>
          
          // console.log(data)
          <Input
            key={data['name']}
            question={data['question']}
            type="text"
          />
        )
        : ('Loading API data...')
      }
    </div>
    </>
  )
}

export default Home


