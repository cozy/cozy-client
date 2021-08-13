const logDeprecate = (...args) => {
  if (process.env.NODE_ENV === 'test') {
    throw new Error('Deprecation error: ' + args[0])
  }
  console.warn(...args)
}

export default logDeprecate
