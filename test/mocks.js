import mockLocation from 'mock-location'

class MockWindow {
  constructor () {
    this.location = mockLocation('/')
    this.history = new MockHistory(this.location)
    this.events = {}
  }

  addEventListener (name, fn) {
    this.events[name] = this.events[name] || []
    this.events[name].push(fn)
  }

  emit (name, e) {
    (this.events[name] || []).forEach(fn => fn(e))
  }
}

class MockHistory {
  constructor (location) {
    this._states = []
    this._location = location
  }

  replaceState (state, title, url) {
    this._location.replace(url)
    this._states[this.length - 1] = {...state, title, url}
  }

  pushState (state, title, url) {
    this._location.replace(url)
    this._states.push({...state, title, url})
  }

  get length () {
    return this._states.length
  }

  get state () {
    return this._states[this.length - 1]
  }

}

export default MockWindow
