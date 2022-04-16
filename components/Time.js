import React, {useState, useEffect } from 'react'


export const Time = () => {

  const [time, setTime] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = [
    'Sunnuntai',
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
    'Lauantai'
  ]
  return (
    <h3 className="time">{time&&`${days[time.getDay()].toUpperCase()}  ${time.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}`}</h3>
  )
}
