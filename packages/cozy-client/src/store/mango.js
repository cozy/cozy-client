const and = conditions => obj => {
  for (let c of conditions) {
    if (!c(obj)) {
      return false
    }
  }
  return true
}

export const selectorFilter = selector => {
  const filters = Object.keys(selector).map(attr => doc => {
    const attrSel = selector[attr]
    const val = doc[attr]
    if (!(typeof attrSel === 'object')) {
      const res = doc[attr] === attrSel
      return res
    }
    const attrConditions = Object.keys(attrSel).map($operator => doc => {
      const selValue = attrSel[$operator]
      if ($operator == '$gt') {
        return val > selValue
      } else if ($operator == '$lt') {
        return val < selValue
      } else {
        throw new Error(`Unknown operator ${$operator}`)
      }
    })
    return and(attrConditions)(doc)
  })
  return and(filters)
}
