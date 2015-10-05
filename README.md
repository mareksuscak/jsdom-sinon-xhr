# Introduction

Provides patch for [XMLHttpRequest npm package](https://www.npmjs.com/package/xmlhttprequest) which doesn't expose `withCredentials` property and causes incorrect behaviour when using `jsdom` with `sinon.fakeServer`.

# Usage

Simply install the dependency:

```
npm install jsdom-xhr-patch --save
```

And apply the patch:

```javascript
// Must be applied before jQuery is require'd
// but after window has been made available.
require('jsdom-xhr-patch').apply(window);
```

# License

See the [LICENSE](https://github.com/mareksuscak/jsdom-xhr-patch/blob/master/LICENSE) file.

