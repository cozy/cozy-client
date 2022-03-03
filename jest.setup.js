import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetch from 'whatwg-fetch'
import { setupConsoleToThrow } from './packages/cozy-client/src/__tests__/console'

setupConsoleToThrow()

global.fetch = fetch

Enzyme.configure({ adapter: new Adapter() })
