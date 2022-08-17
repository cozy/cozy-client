import minilog from '@cozy/minilog'

const logger = minilog('cozy-stack-client')
minilog.suggest.deny('cozy-stack-client', 'info')

export default logger
