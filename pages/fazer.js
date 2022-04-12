import React, {useEffect, useState} from 'react'

import Fazer from '../components/Fazer'

import foodnco from '../data/foodnco'

function fazerPage() {

  const [ data, setData ] = useState({})

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
            console.log(data)
            setData(data);
          });
      } catch(err){
        console.error(err);
      }
    }

    fethcMenu();
    
    
  },[setData]);


  return (
    <Fazer data={data} />
  )
}

export default fazerPage