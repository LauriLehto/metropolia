import React, { useState, useEffect } from 'react'

import Traffic from '../components/Traffic'

//Karaportti location
const coordinates = {
  lat: 60.2238794, 
  lon: 24.758149
}

const LiikennePage = () => {
  const [data, setData] = useState({
    stops: [],
    stopsData: []
  })

  useEffect(() => {
    async function getTraficData(){
      const result = await fetch('/api/liikenne', {
        method: "POST",
        body: JSON.stringify(coordinates)
      })
      const resultJson = await result.json()
      setData(resultJson)
    
    }
    getTraficData()
      
  }, [setData])

  return (
    <Traffic data={data} coordinates={coordinates} />
    )
}

export default LiikennePage