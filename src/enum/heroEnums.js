export const heroRole = [{
  key: 'mage',
  label: '法师',
  value: 'mage'
}, {
  key: 'tank',
  label: '坦克',
  value: 'tank'
}, {
  key: 'assassin',
  label: '刺客',
  value: 'assassin'
}, {
  key: 'support',
  label: '辅助',
  value: 'support'
}, {
  key: 'marksman',
  label: '射手',
  value: 'marksman'
}, {
  key: 'fighter',
  label: '战士',
  value: 'fighter'
}]

/* export const heroRole1 = {
  'mage': '法师',
  'tank': '坦克',
  'assassin': '刺客',
  'support': '辅助',
  'marksman': '射手',
  'fighter': '战士'
}*/

export function getHeroRole_en(roles) {
  const roleStrs = []
  for (const rs in roles) {
    for (const r in this.heroRole) {
      if (rs.key === r.key) {
        roleStrs.join(r)
      }
    }
  }
  console.log(roleStrs)
  return roleStrs
}
