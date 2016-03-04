
# location

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Location effects.

## Installation

    $ npm install @koax/location

## Usage

```js
import {locationEffect, setUrl} from '@koax/location'
import koax, {run} from 'koax'

let state = {}

let io = koax()
io.use(locationEffect(url => {type: 'CHANGE_URL', url}))
io.use(function (action, next) {
  if (action.type === 'CHANGE_URL'){
    state.url = action.url
  }
  return next()
})

let interpret = run(io)

interpret(function * () {
  yield setUrl('/foo')
  state.url // /foo
})


```

## API

### locationEffect(listener)

- `listener` - listen for location changes

**Returns:** koax middleware

### setUrl(url)

- `url` - push url to history

**Returns:** set url action

## License

MIT

[travis-image]: https://img.shields.io/travis/koaxjs/location.svg?style=flat-square
[travis-url]: https://travis-ci.org/koaxjs/location
[git-image]: https://img.shields.io/github/tag/koaxjs/location.svg?sytle=flat-square
[git-url]: https://github.com/koaxjs/location
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@koax/location.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@koax/location
