import minilog from '@cozy/minilog'

const logger = minilog('cozy-models')
minilog.suggest.deny('cozy-models', 'info')

export default logger
