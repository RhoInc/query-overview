import './util/polyfills';
import clone from './util/clone';
import configuration from './configuration/index';
import layout from './layout';
import styles from './styles';
import { createControls, createChart, createTable } from 'webcharts';
import chartCallbacks from './chart/index';
import listingCallbacks from './listing/index';

export default function queryOverview(element = 'body', settings = {}, dom) {
    //Settings
    const mergedSettings = Object.assign({}, configuration.settings, settings);
    const syncedSettings = configuration.syncSettings(mergedSettings);
    const syncedControlInputs = configuration.syncControlInputs(
        configuration.controlInputs,
        syncedSettings
    );

    //Layout and styles
    const containers = layout(element);
    const style = styles(dom ? dom.window.document : document);

    //Controls
    const controls = createControls(containers.controls.node(), {
        location: 'top',
        inputs: syncedControlInputs
    });

    //Chart
    const chart = createChart(containers.chart.node(), syncedSettings, controls);
    chart.test = !!dom;
    chart.element = element;
    chart.style = style;
    chart.initialSettings = clone(mergedSettings);
    for (const callback in chartCallbacks)
        chart.on(callback.substring(2).toLowerCase(), chartCallbacks[callback]);

    //Listing
    const listing = createTable(containers.listing.node(), syncedSettings);
    listing.test = !!dom;
    for (const callback in listingCallbacks)
        listing.on(callback.substring(2).toLowerCase(), listingCallbacks[callback]);

    //Intertwine
    chart.listing = listing;
    listing.chart = chart;

    return chart;
}
