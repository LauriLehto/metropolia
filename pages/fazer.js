import React, {useEffect, useState} from 'react'

import Fazer from '../components/Fazer'

function FazerPage() {

  const [ data, setData ] = useState({})
  const [ fetched, setFetched ] = useState(false)

  useEffect(()=>{

    async function fethcMenu(){
      try {
        await fetch('/api/fazer', { 
          headers: { accept: "Accept: application/json" }, 
          method: "POST",
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