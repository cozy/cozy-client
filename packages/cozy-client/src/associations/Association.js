export default class Association {
  constructor() {}

  static query() {
    throw new Error('A custom relationship must define its query() function')
  }
}
