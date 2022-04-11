import axios from 'axios';
import { getStopById, getStationInfo, stopsByRadius, hslApiUrl } from '../data/hslApi'


//present time in seconds for midnight check
let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
let midnightCheck = now.split('klo')[1].split('.')
midnightCheck = midnightCheck.map(t => parseInt(t))
midnightCheck = midnightCheck[0]*3600+midnightCheck[1]*60+midnightCheck[2]

const dataFetcher = async (query, id) => {
  try {
    return await axios({
      // eslint-disable-next-line react-hooks/exhaustive-deps
      url: hslApiUrl,
      method: 'post',
      data: {
        query: query
      }
    });
  } catch (err) {
    console.error(err)
  }
}

export const updateStops = async (stops) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = await Promise.all(stops.map(stop => dataFetcher(getStopById(stop.gtfsId))))

  const stopsData = data.map(r => {
    const stop = r.data.data.stop.code
    const data =  r.data.data.stop.stoptimesWithoutPatterns
    //console.log(r.data.data.stop)
    const newData = data.map(d=> {
      const obj = {}
      obj.stop = stop
      obj.time = d.scheduledArrival
      obj.heading = d.headsign
      obj.type = "bus"
      return obj
    })
    return newData
  })

  const mergedData = [].concat.apply([], stopsData);

    //organise all results according to time
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cleanData = mergedData.sort((a, b) => a.time > b.time ? 1 : -1)
    cleanData.filter((item, pos) => (cleanData[pos+1] && (cleanData[pos+1].heading !== item.heading)) ||  (cleanData[pos+1] && (cleanData[pos+1].time !== item.time)))
    //organise results by day when nearing the end of the day (86400 -> 0000 seconds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataDay1 = cleanData.filter(d => d.time > midnightCheck)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataDay2 = cleanData.filter(d => d.time < midnightCheck)
    /* setData([...dataDay1, ...dataDay2])
    return '' */
    const updatedData = [...dataDay1, ...dataDay2]
    return updatedData

  return stopsData
}

const updateStations= async () => {
  const hslStations = ['HSL:2000204']
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return Promise.all(hslStations.map(id => getData(getStationInfo(id))))
}










export const getStopsByRadius = async ({lat,lon}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  try{
    const stops = await dataFetcher(stopsByRadius(lat, lon))
    const stopsByR = stops.data.data.stopsByRadius.edges.map(d => d.node.stop)
    return stopsByR
  }catch(error){
    console.error(error)
  }
}
/* 
    
    let newData = []
    
    getStopsByRadius()
      .then(result => {
        const stopsByR = result.data.data.stopsByRadius.edges.map(d => d.node.stop)
        setStops(stopsByR)
        
        updateStops(stopsByR)
          .then(result => {
            result.map(r => {
              const stop = r.data.data.stop.code
              const data =  r.data.data.stop.stoptimesWithoutPatterns
              //console.log(r.data.data.stop)
              data.map(d=> {
                const obj = {}
                obj.stop = stop
                obj.time = d.scheduledArrival
                obj.heading = d.headsign
                obj.type = "bus"
                newData.push(obj)
                return ''
              })
              //organise all results according to time
              // eslint-disable-next-line react-hooks/exhaustive-deps
              const cleanData = [...hslData, ...newData].sort((a, b) => a.time > b.time ? 1 : -1)
              cleanData.filter((item, pos) => (cleanData[pos+1] && (cleanData[pos+1].heading !== item.heading)) ||  (cleanData[pos+1] && (cleanData[pos+1].time !== item.time)))
              //organise results by day when nearing the end of the day (86400 -> 0000 seconds)
              // eslint-disable-next-line react-hooks/exhaustive-deps
              const dataDay1 = cleanData.filter(d => d.time > midnightCheck)
              // eslint-disable-next-line react-hooks/exhaustive-deps
              const dataDay2 = cleanData.filter(d => d.time < midnightCheck)
              setData([...dataDay1, ...dataDay2])
              return ''
            })
          })


        updateStations()
          .then(result => {
            result.map(r =>{
              const station = r.data.data.station.name
              const data =  r.data.data.station.stoptimesWithoutPatterns
              data.map(d=> {
                const obj = {}
                obj.stop = station
                obj.time = d.scheduledArrival
                obj.heading = d.headsign
                obj.type = "train"
                newData.push(obj)
                return null;
              })
              // eslint-disable-next-line react-hooks/exhaustive-deps
              const cleanData = [...hslData, ...newData].sort((a, b) => a.time > b.time ? 1 : -1)
              cleanData.filter((item, pos) => (cleanData[pos+1] && (cleanData[pos+1].heading !== item.heading)) ||  (cleanData[pos+1] && (cleanData[pos+1].time !== item.time)))
              //organise results by day when nearing the end of the day (86400 -> 0000 seconds)
              const dataDay1 = cleanData.filter(d => d.time > midnightCheck)
              const dataDay2 = cleanData.filter(d => d.time < midnightCheck)
              setData([...dataDay1, ...dataDay2])
              return null;
            })
          })
      }) */