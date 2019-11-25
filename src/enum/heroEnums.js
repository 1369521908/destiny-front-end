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

export function getHeroRole_cn(role) {
  for (const index in heroRole) {
    if (heroRole[index].value === role) {
      return heroRole[index].label
    }
  }
}
