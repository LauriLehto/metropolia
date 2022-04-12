
/* let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-') */
const baseUrl = `https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/`;

export default async function handler(req, res) {


  console.log(req.body)
  const {date} = req.body
  console.log(req)
  const url = `${baseUrl}${date}`
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    data.url=url
    console.log(data)

    /* return {
      statusCode: 200,
      body: JSON.stringify({ data: data }),
    } */
    res.status(200).json({ 
      menu:{}
    })
  } catch (error) {
    // output to netlify function log
    console.log(error)
    /* return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ data: error.message }),
    } */
    res.status(500).json({ 
      error
    })
  }

}

module.exports = { handler }
