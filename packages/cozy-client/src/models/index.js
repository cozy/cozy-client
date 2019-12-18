import * as trigger from './trigger'
import * as instance from './instance'
import * as applications from './applications'
import * as file from './file'
import * as account from './account'
import * as note from './note'

// For backward compatibility before 9.0.0
const triggers = trigger
const accounts = account

export {
  triggers,
  trigger,
  instance,
  applications,
  file,
  note,
  account,
  accounts
}
