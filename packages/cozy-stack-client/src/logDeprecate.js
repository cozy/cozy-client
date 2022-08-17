import logger from './logger'

const logDeprecate = (...args) => {
  if (process.env.NODE_ENV === 'test') {
    throw new Error('Deprecation error: ' + args[0])
  }
  logger.warn(...args)
}

export default logDeprecate
