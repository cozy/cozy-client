import * as trigger from './trigger'
import * as instance from './instance'
import * as applications from './applications'
import * as file from './file'
import * as folder from './folder'
import * as account from './account'
import * as note from './note'
import * as permission from './permission'
import * as utils from './utils'
import * as contact from './contact'
import * as document from './document'

// For backward compatibility before 9.0.0
const triggers = trigger
const accounts = account

export {
  triggers,
  trigger,
  instance,
  applications,
  file,
  folder,
  note,
  account,
  accounts,
  permission,
  utils,
  contact,
  document
}
