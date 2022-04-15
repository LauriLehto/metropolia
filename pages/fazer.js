import React, {useEffect, useState} from 'react'

import Fazer from '../components/Fazer'

import foodnco from '../data/foodnco'

function FazerPage() {

  const [ data, setData ] = useState({})
  const [ fetched, setFetched ] = useState(false)

  const todayTimeString = () => {
    let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-')
    return time
  }

  useEffect(()=>{
    const today = todayTimeString()

    async function fethcMenu(){
      try {
        await fetch('/api/fazer', { 
          headers: { accept: "Accept: application/json" }, 
          method: "POST",
          body: today
        })
          .then((x) => x.json())
          .then(({ data }) => {
            setData(data);
            setFetched(true)
          });
      } catch(err){
        console.error(err);
      }
    }

    fethcMenu();
    
    
  },[setData]);


  return (
    <Fazer data={data} fetched={fetched} />
  )
}

export default FazerPage