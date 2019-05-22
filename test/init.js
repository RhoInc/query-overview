import jsdom from 'jsdom';
import queryOverview from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./queries.json');

describe('The init method is called.', () => {
    const { JSDOM } = jsdom;
    global.window = (new JSDOM(``, { runScripts: "dangerously" })).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
    });

    after(() => {
    });

    beforeEach(() => {
        instance = queryOverview(container, {exportable: false}, dom);
        instance.init(data, true);
    });

    afterEach(() => {
        instance.destroy();
    });

    it('should attach data to the webcharts chart object', function() {
        expect(instance.raw_data.length).toEqual(data.length);
    });

    //it('should render the controls', function() {
    //    expect(container.querySelectorAll('*').length).toEqual(0);
    //});

    //it('should render the chart', function() {
    //    expect(container.querySelectorAll('*').length).toEqual(0);
    //});

    //it('should render the listing', function() {
    //    expect(container.querySelectorAll('*').length).toEqual(0);
    //});
});
