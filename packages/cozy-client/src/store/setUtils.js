export const union = (set1, set2) => {
  return new Set([...set1, ...set2])
}

export const difference = (set1, set2) => {
  return new Set([...set1].filter(x => !set2.has(x)))
}

export const intersection = (set1, set2) => {
  return new Set([...set1].filter(x => set2.has(x)))
}
