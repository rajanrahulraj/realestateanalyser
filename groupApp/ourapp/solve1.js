const fs = require('fs')
const Papa = require('papaparse')

const csvFilePath = '2021.csv'
const jsonFilePath = '2021taxi.json'

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read CSV file:', err)
    return
  }

  // 解析 CSV 数据
  const parsedData = Papa.parse(data, { header: true })

  // 将解析的数据转换为 JSON 格式
  const jsonData = JSON.stringify(parsedData.data, null, 2)

  // 写入 JSON 文件
  fs.writeFile(jsonFilePath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write JSON file:', err)
      return
    }

    console.log('CSV file converted to JSON successfully!')
  })
})
