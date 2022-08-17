import { getMutedErrors, muteError } from './account'
export { getMutedErrors, muteError }
import logger from '../logger'

logger.warn(
  'models/accounts is deprecated in cozy-client, please use models/account instead'
)
