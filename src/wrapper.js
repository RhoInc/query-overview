import './util/object-assign';
import './util/moveToFront';
import './util/moveToBack';
import clone from './util/clone';

import defaultSettings from './defaultSettings';
import { controlInputs, syncControlInputs, syncSettings } from './defaultSettings';

import { createControls, createChart, createTable } from 'webcharts';

//chart callbacks
import onInit from './chart/onInit';
import onLayout from './chart/onLayout';
import onPreprocess from './chart/onPreprocess';
import onDataTransform from './chart/onDataTransform';
import onDraw from './chart/onDraw';
import onResize from './chart/onResize';
import onDestroy from './chart/onDestroy';

//listing callbacks
import onInitL from './listing/onInit';
import onLayoutL from './listing/onLayout';
import onDrawL from './listing/onDraw';
import onDestroyL from './listing/onDestroy';

export default function queryOverview(element, settings) {
    const mergedSettings = Object.assign({}, defaultSettings, settings),
        syncedSettings = syncSettings(mergedSettings),
        syncedControlInputs = syncControlInputs(controlInputs, syncedSettings),
        controls = createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        }),
        chart = createChart(element, syncedSettings, controls),
        listing = createTable(element, { exportable: syncedSettings.exportable });

    chart.initialSettings = clone(mergedSettings);
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDataTransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    listing.on('init', onInitL);
    listing.on('layout', onLayoutL);
    listing.on('draw', onDrawL);
    listing.on('destroy', onDestroyL);

    chart.listing = listing;
    listing.chart = chart;

    return chart;
}
