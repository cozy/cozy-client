import { Association } from './associations'

export const dehydrate = document => {
  const dehydrated = {}
  Object.entries(document).forEach(([key, value]) => {
    if (!(value instanceof Association)) {
      dehydrated[key] = value
    } else if (value.raw) {
      dehydrated[key] = value.raw
    }
  })
  return dehydrated
}
