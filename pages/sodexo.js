import Sodexo from '../components/Sodexo'
import React, {useEffect, useState} from 'react'

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
          console.log(data)
          if(data){
            setFetched(true)
            setData(data)
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