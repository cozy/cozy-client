import { Association } from '../associations'

export const dehydrate = document => {
  const dehydrated = Object.entries(document).reduce(
    (documentArg, [key, value]) => {
      let document = documentArg
      if (!(value instanceof Association)) {
        document[key] = value
        // @ts-ignore
      } else if (value.dehydrate) {
        // @ts-ignore
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
