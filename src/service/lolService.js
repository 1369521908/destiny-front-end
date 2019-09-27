// import { getDetailList } from '@/api/lol'

export function initData(data, page) {
  /* let option = {
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      // data: [820, 932, 901, 934, 1290, 1330, 1320],
      data: [],
      type: 'line'
    }]
  }
  getDetailList().then(response => {
    data = response.data.records
    page.total = response.data.total
    // this.option.column = JSON.parse(response.header)
    const heroName = []
    const attackRange = []
    for (const d in response.data.records) {
      const hero = response.data.records[d]
      heroName.push(hero.alias)
      attackRange.push(hero.attackrange)
    }
    option.xAxis.data = heroName
    option.series.data = attackRange
    console.log(heroName)
    console.log(attackRange)
  }).catch(e => {
    console.log(e)
    option = e
  })
  return option*/
}
