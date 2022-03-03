import minilog from '@cozy/minilog'

const logger = minilog('cozy-pouch-link')
minilog.suggest.deny('cozy-pouch-link', 'info')

export default logger
