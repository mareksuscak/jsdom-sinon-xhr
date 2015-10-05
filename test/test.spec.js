'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('jsdom-xhr-patch', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  context('when applied, ensures', () => {
    describe('Original XMLHttpRequest', () => {
      it('is available in both global and window object as _OrigXMLHttpRequest property', () => {
        expect(global._OrigXMLHttpRequest).to.be.ok;
        expect(window._OrigXMLHttpRequest).to.be.ok;
        expect('withCredentials' in (new window._OrigXMLHttpRequest)).to.be.false;
      });
    });

    describe('XMLHttpRequest', () => {
      it('is patched and contains withCredentials property', () => {
        expect('withCredentials' in (new XMLHttpRequest)).to.be.true;
      });
    });

    describe('sinon.fakeServer', () => {
      it('does respond to XmlHttpRequests properly', (done) => {
        const uri = '/data';

        const data = [{ id: 12, comment: "Hey there" }];
        this.sandbox.server.respondWith('GET', uri, [
          200, { 'Content-Type': 'application/json' },
          JSON.stringify(data)]
        );

        var successSpy = sinon.spy();

        $.ajax({
          url: uri,
          dataType: 'json'
        }).done(successSpy).always(() => {
          expect(successSpy).to.have.been.calledWith(data);
          done();
        });

        this.sandbox.server.respond();
      });
    });

    describe("jQuery", () => {
      it('correctly picks up the patched XmlHttpRequest', () => {
        expect($.support.cors).to.be.true;
      });
    });
  });
});