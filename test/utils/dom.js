'use strict';

const jsdom = require('jsdom');
const fs = require('fs');

jsdom.defaultDocumentFeatures = {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script'],
    SkipExternalResources: false
};

const document = jsdom.jsdom(`
  <html><head></head><body><div id="content-root"></div></body></html>`, {
  virtualConsole: jsdom.createVirtualConsole().sendTo(console),
  url: 'http://localhost:9000'
});

// Get a reference to the JSDOM document's window object
const window = document.defaultView;

// Listen for external script errors
window.addEventListener('error', function (event) {
  console.error('script error!!', event.stack);
});

// Apply XHR patch. MUST BE applied before jQuery.
require('../../index').apply(window);

// Include jQuery and expose globals
const jQuery = require('jquery')(window);
global.document = document;
global.window = window;

// Expose window's own properties as globals
propagateToGlobal(window);

function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;
    global[key] = window[key];
  }
}