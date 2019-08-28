# bmkg.js

[![Build Status](https://travis-ci.org/drizki/bmkg.svg?branch=master)](https://travis-ci.org/drizki/bmkg)
[![codecov](https://codecov.io/gh/drizki/bmkg/branch/master/graph/badge.svg)](https://codecov.io/gh/drizki/bmkg)
[![Latest Stable Version](https://img.shields.io/npm/v/bmkg.svg)](https://www.npmjs.com/package/bmkg)
[![License](https://img.shields.io/npm/l/bmkg.svg)](https://www.npmjs.com/package/bmkg)
[![NPM Downloads](https://img.shields.io/npm/dt/bmkg.svg)](https://www.npmjs.com/package/bmkg)
[![NPM Downloads](https://img.shields.io/npm/dm/bmkg.svg)](https://www.npmjs.com/package/bmkg)

This module is a wrapper around BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) open data XML API. Please refer to this [link](http://data.bmkg.go.id) to learn more about the official API.

#### Why this package exists

BMKG offers data to the public using their open data initiative. Problem is, it only serves XML as the data output, no support for JSON or any other types.

#### Usage

Check out [examples](https://github.com/drizki/bmkg/tree/master/examples) folder on how to use (it's super simple)

#### Installation

The package is available at NPM repository.

```bash
npm install bmkg
# or
yarn add bmkg
```

#### Test

Clone the repository and run the following command:

```bash
npm test
```

## Roadmap

- Browser version

#### Limitations

Currently, this package only runs in node.js environment as it depends on [node-fetch](https://www.npmjs.com/package/node-fetch). I'll refactor the code and test it on different environments later.

## License

The source code is licensed under [MIT](https://github.com/drizki/bmkg/blob/master/LICENSE).

All weather and earthquake data are sourced directly from [BMKG](http://data.bmkg.go.id/).

© 2019 Dwi Rizki Irawan
