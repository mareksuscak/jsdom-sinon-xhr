[![Build Status](https://travis-ci.org/mareksuscak/jsdom-xhr-patch.svg)](https://travis-ci.org/mareksuscak/jsdom-xhr-patch)

Introduction
============

**UPDATE:** Please note that as of `xmlhttprequest 1.8.0`, `withCredentials` is finally supported so it should not be needed to include this patch anymore. However make sure that `global.XMLHttpRequest` is available before including jQuery.

**UPDATE 2:** As of `jsdom 7.0.0`, `xmlhttprequest` dependency was removed completely and replaced by a custom implementation which seems to be more spec-compliant. 

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

