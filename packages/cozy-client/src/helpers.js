import { Association } from './associations'

export const dehydrate = document => {
  const dehydrated = Object.entries(document).reduce(
    (document, [key, value]) => {
      if (!(value instanceof Association)) {
        document[key] = value
      } else if (value.dehydrate) {
        document = value.dehydrate(document)
      } else {
        throw new Error(
          `Association on key ${key} should have a dehydrate method`
        )
      }
      return document
    },
    {}
  )
  return dehydrated
}
