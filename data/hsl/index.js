import axios from 'axios';
import { getStopById, getStationInfo, stopsByRadius, hslApiUrl } from './queries'


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
  const hslStations = ['HSL:2000204']
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trainData = await Promise.all(hslStations.map(id => dataFetcher(getStationInfo(id))))
  const stationsData = trainData.map(r =>{
    const station = r.data.data.station.name
    const data =  r.data.data.station.stoptimesWithoutPatterns
    const newData = data.map(d=> {
      const obj = {}
      obj.stop = station
      obj.time = d.scheduledArrival
      obj.heading = d.headsign
      obj.type = "train"
      return obj;
    })
    
    return newData;
  })
  const bussData = await Promise.all(stops.map(stop => dataFetcher(getStopById(stop.gtfsId))))
  const stopsData = bussData.map(r => {
    const stop = r.data.data.stop.code
    const data =  r.data.data.stop.stoptimesWithoutPatterns
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

  let mergedData1 = [].concat.apply([], stopsData);
  let mergedData2 = [].concat.apply([], stationsData);
  const mergedData = mergedData1.concat(mergedData2)

  let orderedData = mergedData.sort((a, b) => a.time < b.time ? 1 : -1)
  orderedData = orderedData.reverse()
 /*  orderedData.filter((item, pos) => (orderedData[pos+1] && (orderedData[pos+1].heading !== item.heading)) ||  (orderedData[pos+1] && (orderedData[pos+1].time !== item.time))) */
  //orderedData.filter((item, pos) => orderedData[pos+1] && (orderedData[pos+1].time !== item.time))
  const dataDay1 = orderedData.filter(d => d.time > 45000)
  const dataDay2 = orderedData.filter(d => d.time < 45000)
  const updatedData = [...dataDay1, ...dataDay2]

  return updatedData
}

export const getStopsByRadius = async ({lat,lon}) => {
  try{
    const stops = await dataFetcher(stopsByRadius(lat, lon))
    const stopsByR = stops.data.data.stopsByRadius.edges.map(d => d.node.stop)
    return stopsByR
  }catch(error){
    console.error(error)
  }
}
