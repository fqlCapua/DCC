const fs = require('fs')

const areaStream = fs.createReadStream('./area.json')

let json = ''

areaStream.on('data', data => {
  json += data
})

areaStream.on('end', () => {
  reviseData(JSON.parse(json))
  console.log('處理數據完畢')
})

const reviseData = (data) => {
  let realData = {}
  data.map((item, index) => {
    let areaInfo = item.split('-')
    realData[index + ''] = {
      'name': areaInfo[1],
      'tel': areaInfo[2],
      'en': areaInfo[0]
    }
  })
  fs.writeFileSync('./area_new.json', JSON.stringify(realData, null, 2))
}
