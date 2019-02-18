const _Date = Date

export function mockDate(isoDate) {
  global.Date = class extends _Date {
    constructor() {
      super()
      return new _Date(isoDate)
    }
  }
}

export function restoreDate() {
  global.Date = _Date
}
