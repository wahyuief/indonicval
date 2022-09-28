import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({"code":405, "message": "Invalid Method! Only using GET"})
  if (req.headers.baby_yoda_token !== process.env.BABY_YODA_TOKEN) return res.status(401).json({"code":401, "message": "Your'e not authorized!"})

  const { id } = req.query
  if (!id) return res.status(400).json({"code":400, "message": "ID parameter is required!"})
  if (!/^[0-9]+$/.test(id)) return res.status(400).json({"code":400, "message": "Invalid parameter ID! The indonesian NIC is only number"})
  if (id.length !== 16) return res.status(400).json({"code":400, "message": "Invalid parameter ID! The length of the Indonesian NIC is a 16 digit number"})

  const filePath = path.join(process.cwd(), 'data.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const data = JSON.parse(jsonData)

  const province = id.slice(0, 2)
  const city = id.slice(0, 4)
  const district = id.slice(0, 6)
  const day = id.slice(6, 8)
  const month = id.slice(8, 10)
  const year = id.slice(10, 12)
  const code = id.slice(12, 16)
  const gender = day.length > 40 ? 'Female' : 'Male'

  const details = {}
  details['id'] = id
  details['valid'] = true
  details['data'] = {}
  details['data']['day'] = day
  details['data']['month'] = new Date(year, month-1, day).toLocaleString('default', { month: 'long' })
  details['data']['year'] = new Date(year, month, day).getFullYear()
  details['data']['gender'] = gender
  details['data']['district'] = capitalize(data['kecamatan'][district].split(' -- ')[0])
  details['data']['city'] = capitalize(data['kabkot'][city])
  details['data']['province'] = capitalize(data['provinsi'][province])
  details['data']['postcode'] = data['kecamatan'][district].split(' -- ')[1]

  res.status(200).json(details)
}

function capitalize(word) {
  return word.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}