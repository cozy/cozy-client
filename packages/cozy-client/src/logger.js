import minilog from 'minilog'

const logger = minilog('cozy-client')
minilog.suggest.deny('cozy-client', 'info')

export default logger
