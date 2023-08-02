const fs = require('fs')
const Papa = require('papaparse')

const csvFilePath = 'Real_Estate.csv'
const jsonFilePath = 'realestate.json'

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read CSV file:', err)
    return
  }

  // 解析 CSV 数据
  const parsedData = Papa.parse(data, { header: true })

  // 过滤 JSON 数据，保留 YEAR >= 2016 的对象
  const filteredData = parsedData.data.filter((item) => parseInt(item.YEAR) >= 2017)

  // 将过滤后的数据转换为 JSON 格式
  const jsonData = JSON.stringify(filteredData, null, 2)

  // 写入 JSON 文件
  fs.writeFile(jsonFilePath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write JSON file:', err)
      return
    }

    console.log('CSV file converted to JSON and filtered successfully!')
  })
})
