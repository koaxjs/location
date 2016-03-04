/**
 * Imports
 */

import bindUrl from 'bind-url'
import driver from '@koax/driver'
import {BOOT} from '@koax/boot'

const SET_URL = '@koax/location/SET_URL'
const GET_URL = '@koax/location/GET_URL'

/**
 * Location effect
 * @param  {Function} listener   action creator
 * @param  {Object} wnd=window
 * @return {Generator}
 */

function locationEffect (listener, wnd = window) {
  let {push, drive} = driver(next => bindUrl({wnd}, next))

  return function * (action, next) {
    switch (action.type) {
      case SET_URL:
        let url = action.payload.url
        action.payload.replace
          ? wnd.history.replaceState(null, null, url)
          : wnd.history.pushState(null, null, url)
        yield push(url)
        break
      case GET_URL:
        return wnd.location.pathname + wnd.location.search
      case BOOT:
        drive(listener)
        return next()
      default:
        return next()
    }
  }
}

/**
 * Set url action creator
 * @param {String} url
 * @param {Boolean} replace
 * @return {Object}
 */

function setUrl (url, replace) {
  return {type: SET_URL, payload: {url, replace}}
}

/**
 * Get url action creator
 * @return {Object}
 */

function getUrl () {
  return {type: GET_URL}
}

/**
 * Exports
 */

export {locationEffect, setUrl, getUrl}
