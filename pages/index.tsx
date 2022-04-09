import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import axios from "axios"
import { useState, useEffect } from 'react'
import Form from '../components/Form'

const Home: NextPage = () => {

  let [apiData, setApiData] = useState([])
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
    .then(response => console.log(response.data))
    // .then(res => setApiData(res.data))
    .catch(err => setError(err))
  }, [])

  return (
    
    <>
    <Nav/>
    <div className="w-full">
      <Head>
        <title>T Rich - Coding Assessment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        apiData.length > 0 ? apiData.map(data => console.log(data))
        : ('Loading API data...')
      }
      {/* <Form/> */}
    </div>
    </>
  )
}

export default Home


