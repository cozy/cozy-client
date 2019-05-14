import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetch from 'whatwg-fetch'

global.fetch = fetch

Enzyme.configure({ adapter: new Adapter() })
