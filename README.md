[![Build Status](https://travis-ci.org/mareksuscak/jsdom-xhr-patch.svg)](https://travis-ci.org/mareksuscak/jsdom-xhr-patch)

Introduction
============

Provides patch for [XMLHttpRequest npm package](https://www.npmjs.com/package/xmlhttprequest) which doesn't expose `withCredentials` property and causes incorrect behaviour when using `jsdom` with `sinon.fakeServer`.

# Usage

Simply install the dependency:

```
npm install jsdom-xhr-patch --save
```

And apply the patch:

```javascript
// Must be applied before jQuery and sinon are require'd
// but after window has been made available.
require('jsdom-xhr-patch').apply(window);
```

Please note that in case `window.XMLHttpRequest` doesn't need patching you'll be notified in the Node's console.

# Tests

After cloning the repo you can run test suite by invoking:

```
git clone https://github.com/mareksuscak/jsdom-xhr-patch.git
cd jsdom-xhr-patch
npm install
npm test
```

# License

See the [LICENSE](https://github.com/mareksuscak/jsdom-xhr-patch/blob/master/LICENSE.md) file.

