const fetch = require('node-fetch')

const sdxUrl = `https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/`;

const todayTimeString = () => {
  let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
  let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-')
  return time
}

export default async function handler( req, res ) {
  const date = todayTimeString()

    const url = `${sdxUrl}${date}`
    try {
      const responseFi = await fetch(url, {
        headers: { Accept: 'application/json' },
      })
      if (!responseFi.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: responseFi.status, body: responseFi.statusText }
      }
      const data = await responseFi.json()

      res.status(200).json({data, url})
     
    } catch (error) {
      // output to netlify function log
      console.log(error)
      return {
        statusCode: 500,
        // Could be a custom message or object i.e. JSON.stringify(err)
        body: JSON.stringify({ data: error.message }),
      }
    }
  } 