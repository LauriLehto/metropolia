import { getStopsByRadius, updateStops } from "../../data/hsl"

export default async function handler(req, res) {

  const stops = await getStopsByRadius(JSON.parse(req.body))

  let stopsData = []
  if(stops.length){
    stopsData = await updateStops(stops)
    console.log(stops.length, stopsData.length)

  }

  if(stops.length && stopsData.length)
  res.status(200).json({ 
    stops,
    stopsData
  })
}