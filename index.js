require('now-env')
const redirect = require('micro-redirect')
const axios = require('axios')

module.exports = async (req, res) => {
  const client = axios.create({
    baseURL: 'https://api.binb.bricks.pub/v1/',
    headers: {
      'X-API-KEY': process.env.API_KEY,
      'X-CONFIRMATION-TOKEN': process.env.CONFIRMATION_TOKEN,
   }
  })
  const location = await client.post('/contents/tokens', {
    "content_id": "eafd96f6-0c97-432a-a677-16dc306004ed",
    "exit_url": "https://qiita.com/shwld/items/23b1105911e6578c1080",
    "continuation_url": "https://qiita.com/shwld/items/23b1105911e6578c1080"
  }).then(response => {
    const { data } = response.data
    return data.presigned_url
  })
  // TODO: 本運用時にはエラー処理を書く
  redirect(res, 302, location)
}
