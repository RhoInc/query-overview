import jsdom from 'jsdom';
import queryOverview from '../src/index.js';
import expect from 'expect';
import d3 from 'd3';
import { createChart, createTable, createControls } from 'webcharts';

describe('The queryOverview function is called.', () => {
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
        instance = queryOverview(container, {}, dom);
    });

    afterEach(() => {
    });

    it('should return a webcharts chart object', function() {
        const chartProperties = Object.keys(createChart(dom.window.document.createElement('div')));
        expect(Object.keys(instance)).toEqual(expect.arrayContaining(chartProperties));
    });

    it('should return a webcharts chart object with an attached webcharts controls object', function() {
        const controlsProperties = Object.keys(createControls(dom.window.document.createElement('div')));
        expect(Object.keys(instance.controls)).toEqual(expect.arrayContaining(controlsProperties));
    });

    it('should return a webcharts chart object with an attached webcharts table object', function() {
        const tableProperties = Object.keys(createTable(dom.window.document.createElement('div')));
        expect(Object.keys(instance.listing)).toEqual(expect.arrayContaining(tableProperties));
    });

    it('should return a webcharts chart object with an attached stylesheet', function() {
        expect(instance.style.tagName).toEqual('STYLE');
    });
});
