import "./util/object-assign";
import "./util/moveToFront";
import "./util/moveToBack";

import defaultSettings from "./defaultSettings";
import {
  controlInputs,
  syncControlInputs,
  syncSettings
} from "./defaultSettings";

import { createControls, createChart, createTable } from "webcharts";

//chart callbacks
import onInit from "./chart/onInit";
import onLayout from "./chart/onLayout";
import onPreprocess from "./chart/onPreprocess";
import onDataTransform from "./chart/onDataTransform";
import onDraw from "./chart/onDraw";
import onResize from "./chart/onResize";

//listing callbacks
import onInitL from "./listing/onInit";
import onLayoutL from "./listing/onLayout";
import onPreprocessL from "./listing/onPreprocess";
import onDataTransformL from "./listing/onDataTransform";
import onDrawL from "./listing/onDraw";
import onResizeL from "./listing/onResize";

export default function queryOverview(element, settings) {
  //merge user's settings with defaults
  let mergedSettings = Object.assign({}, defaultSettings, settings);

  //keep settings in sync with the data mappings
  mergedSettings = syncSettings(mergedSettings);

  //keep control inputs in sync and create controls object
  let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
  let controls = createControls(element, {
    location: "top",
    inputs: syncedControlInputs
  });

  //create chart
  let chart = createChart(element, mergedSettings, controls);
  chart.on("init", onInit);
  chart.on("layout", onLayout);
  chart.on("preprocess", onPreprocess);
  chart.on("datatransform", onDataTransform);
  chart.on("draw", onDraw);
  chart.on("resize", onResize);

  //create listing
  let listing = createTable(element, {});
  listing.on("init", onInitL);
  listing.on("layout", onLayoutL);
  listing.on("preprocess", onPreprocessL);
  listing.on("datatransform", onDataTransformL);
  listing.on("draw", onDrawL);
  listing.on("resize", onResizeL);
  listing.init([]);

  chart.listing = listing;
  listing.chart = chart;

  return chart;
}
