import './util/polyfills';
import clone from './util/clone';
import configuration from './configuration/index';
import layout from './layout';
import styles from './styles';
import { createControls, createChart, createTable } from 'webcharts';
import chartCallbacks from './chart/index';
import listingCallbacks from './listing/index';

export default function queryOverview(element, settings) {
    //Settings
    const mergedSettings = Object.assign({}, configuration.settings, settings);
    const syncedSettings = configuration.syncSettings(mergedSettings);
    const syncedControlInputs = configuration.syncControlInputs(
        configuration.controlInputs,
        syncedSettings
    );

    //Layout and styles
    const containers = layout(element);
    styles();

    //Controls
    const controls = createControls(containers.controls.node(), {
        location: 'top',
        inputs: syncedControlInputs
    });
    controls.element = element;

    //Chart
    const chart = createChart(containers.chart.node(), syncedSettings, controls);
    chart.element = element;
    chart.initialSettings = clone(mergedSettings);
    for (const callback in chartCallbacks)
        chart.on(callback.substring(2).toLowerCase(), chartCallbacks[callback]);

    //Listing
    const listing = createTable(containers.listing.node(), {
        sortable: false,
        exportable: syncedSettings.exportable
    });
    listing.element = element;
    for (const callback in chartCallbacks)
        chart.on(callback.substring(2).toLowerCase(), chartCallbacks[callback]);

    //Intertwine
    chart.listing = listing;
    listing.chart = chart;

    return chart;
}
