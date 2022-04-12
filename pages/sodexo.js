import Sodexo from '../components/Sodexo'
import React, {useEffect, useState} from 'react'

import SodexoRow from '../components/SodexoRow'
import sodexo from '../data/sodexo'

const SodexoPage = () => {

  const [ data, setData ] = useState({})
  const [ fetched, setFetched ] = useState(false)

  useEffect(()=>{
    try {
      fetch("/api/sodexo", { 
        headers: { accept: "Accept: application/json" }, 
        
      })
        .then((x) => x.json())
        .then(({ data }) => {
          if(data.courses){
            console.log(data)
            setData(data)
          } else {
            setFetched(true)
          }
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData, setFetched])

  return (
    <Sodexo data={data} fetched={fetched} />
  )
}

export default SodexoPage