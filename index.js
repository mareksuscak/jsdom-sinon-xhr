'use strict';

// Monkey patching is not a good practice but there's simply no other way
// at moment. :(
//
// We have to patch JSDOM's XMLHttpRequest which is brought in
// as an xmlhttprequest npm dependency and has an unpatched issue:
// https://github.com/driverdan/node-XMLHttpRequest/issues/71
function jsdomXhrPatch(context) {
  const window = context || this;

  if (typeof window.$ !== 'undefined' || typeof window.jQuery !== 'undefined') {
    console.warn('You must apply jsdomXhrPatch before including the jQuery.');
    return;
  }

  if (typeof window.XMLHttpRequest === 'undefined') {
    console.warn('There\'s no XMLHttpRequest defined on the provided window object.');
    return;
  }

  if ('withCredentials' in (new window.XMLHttpRequest())) {
    if (typeof global.XMLHttpRequest === 'undefined') {
      global.XMLHttpRequest = window.XMLHttpRequest;
    }
    console.warn('Existing XMLHttpRequest is already spec-compliant. You can safely remove the invocation of jsdomXhrPatch but don\'t forget to make XMLHttpRequest available as a global before including jQuery.');
    return;
  }

  const OrigXMLHttpRequest = window.XMLHttpRequest;

  function PatchedXMLHttpRequest() {
    const xhr = OrigXMLHttpRequest.apply(this, arguments);

    if (!xhr) {
      console.warn('The expected xhr object wasn\'t returned. Failed to patch XMLHttpRequest.');
      return null;
    }

    // Define withCredentials with a default false based on the spec
    xhr.withCredentials = false;

    return xhr;
  }

  // Replace the original implementation.
  //
  // Note: Also jQuery expects global.XMLHttpRequest when being included,
  // otherwise $.support.cors is left false incorrectly and we want to
  // prevent explicitly setting that to true. See below for more details:
  // http://stackoverflow.com/a/25590174
  global.XMLHttpRequest = window.XMLHttpRequest = PatchedXMLHttpRequest;

  // Make sure to expose the original XMLHttpRequest as well
  global._OrigXMLHttpRequest = window._OrigXMLHttpRequest = OrigXMLHttpRequest;
}

module.exports = jsdomXhrPatch;
