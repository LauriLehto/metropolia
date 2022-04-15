
/* let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-') */
const url =  `https://www.foodandco.fi/modules/json/json/Index?costNumber=3208`

"https://www.foodandco.fi/modules/json/json/Index?costNumber=3208&language=fi"
export default async function handler(req, res) {

  try {
    const responseFi = await fetch(`${url}&language=fi`, {
      headers: { Accept: 'application/json' },
    })
    if (!responseFi.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: responseFi.status, body: responseFi.statusText }
    }
    const responseEn = await fetch(`${url}&language=en`, {
      headers: { Accept: 'application/json' },
    })
    if (!responseEn.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: responseEn.status, body: responseEn.statusText }
    }
    const data = {} 
    data.fi= await responseFi.json()
    data.en= await responseEn.json()

    res.status(200).json({data})

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

