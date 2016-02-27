/**
 * Imports
 */


import 'babel-polyfill'
import test from 'tape'
import {locationEffect, getUrl, setUrl} from '../src'
import koax, {interpreter} from 'koax'
import MockWindow from './mocks'

/**
 * Tests
 */

let appURL

let app = koax()
app.use(locationEffect(url => {type: 'CHANGE_URL', url}, new MockWindow()))
app.use(function (action) {
  if (action.type === 'CHANGE_URL') {
    appURL = action.url
  }
})

test('should get url', (t) => {
  let interpret = interpreter(app)

  interpret(function * () {
    let url = yield getUrl()
    t.equal(url, '/')
    yield setUrl('/foo')
    t.equal(appURL, '/foo')
  })

})
