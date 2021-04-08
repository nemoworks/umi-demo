import data from './data'
import copy from './data copy'
import fs from 'fs'
const modifyData = (req, res) => {
    let newdata = req.body
    fs.writeFileSync('./mock/data.json', JSON.stringify(newdata))
    res.send('ok')
}

const recover = (req, res) => {
    fs.writeFileSync('./mock/data.json', JSON.stringify(copy))
    res.send('ok')
}


export default {
  // 支持值为 Object 和 Array
  'GET /api/employees': data,
  'POST /api/employees': modifyData,
  'GET /api/recover': recover
}