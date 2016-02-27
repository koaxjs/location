/**
 * Imports
 */

import bindUrl from 'bind-url'
import driver from '@koax/driver'
import {BOOT} from '@koax/boot'

const SET_URL = '@koax/location/SET_URL'
const GET_URL = '@koax/location/GET_URL'

/**
 * location
 */

function locationEffect (listener, wnd=window) {
  let {push, drive} = driver(next => bindUrl({wnd}, next))

  return function * (action, next) {
    switch (action.type) {
      case SET_URL:
        let url = action.payload.url
        action.payload.replace
          ? wnd.history.replaceState(null, null, url)
          : wnd.history.pushState(null, null, url)
        console.log('push url', url)
        yield push(url)
      case GET_URL:
        return wnd.location.pathname + wnd.location.search
      case BOOT:
        drive(listener)
      default:
        return next()
    }
  }
}


function setUrl (url, replace) {
  return {type: SET_URL, payload: {url, replace}}
}

function getUrl () {
  return {type: GET_URL}
}


/**
 * Exports
 */

export {locationEffect, setUrl, getUrl}
