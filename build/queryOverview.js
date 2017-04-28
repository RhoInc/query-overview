var queryOverview = (function (webcharts) {
'use strict';

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';

      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

var defaultSettings = {
  //Addition settings for this template
  cutoff: 10,
  alphabetize: false,
  form_col: "form",
  field_col: "field",
  status_col: "status",
  filter_cols: ["markingGroup", "site"],
  filter_labels: ["Marking Group: ", "Site: "],
  groupBy: [null],

  //Standard webcharts settings
  "max_width": "1000",
  "y": {
    "type": "ordinal",
    "column": null,
    "label": " ",
    "sort": "total-descending"
  },
  "x": {
    "label": "# of Queries",
    "behavior": "flex"
  },
  "marks": [{
    "type": "bar",
    "per": [null],
    "split": null,
    "arrange": "stacked",
    "summarizeX": "count",
    "tooltip": null
  }, {
    "type": "text",
    "per": [null],
    "summarizeX": "count",
    "text": "$x",
    "attributes": { "dx": '0.25em', "dy": ".25em" }
  }],
  color_by: null,
  range_band: 15,
  margin: { "right": "50" },
  legend: { location: "top" }
};

// Replicate settings in multiple places in the settings object
function syncSettings(settings) {
  settings.y.column = settings.form_col;
  settings.marks[0].per[0] = settings.form_col;
  settings.marks[1].per[0] = settings.form_col;
  settings.marks[0].tooltip = settings.status_col ? "[" + settings.status_col + "] - $x queries" : "$x queries";
  settings.groupBy[0] = "FormField"; //hard-coded variable derived in .on("init")
  settings.groupBy[1] = settings.form_col;
  if (settings.status_col) {
    settings.marks[0].split = settings.status_col;
    settings.color_by = settings.status_col;
    if (settings.groupBy.indexOf(settings.status_col) == -1) {
      settings.groupBy.push(settings.status_col);
    }
  }
  if (settings.filter_cols) {
    settings.filter_cols.forEach(function (d) {
      if (settings.groupBy.indexOf(d) == -1) {
        settings.groupBy.push(d);
      }
    });
  }
  return settings;
}

// Default Control objects
var controlInputs = [{ type: "subsetter", value_col: null, label: "Form: " }, {
  type: "dropdown",
  option: "y.column",
  label: "Group By: ",
  values: [null],
  require: true
}, {
  type: "radio",
  option: "cutoff",
  label: "Show first N results",
  values: ["10", "25", "All"]
}, { type: "checkbox", option: 'alphabetize', label: 'Alphabetical? ' }];

// Map values from settings to control inputs
function syncControlInputs(controlInputs, settings) {
  var formControl = controlInputs.filter(function (d) {
    return d.label == "Form: ";
  })[0];
  formControl.value_col = settings.form_col;

  var yColControl = controlInputs.filter(function (d) {
    return d.label == "Group By: ";
  })[0];
  yColControl.values = settings.groupBy;

  if (settings.status_col) {
    var statusControl = {
      type: "subsetter",
      value_col: settings.status_col,
      label: "Status: ",
      multiple: true
    };
    var filter_vars = controlInputs.map(function (d) {
      return d.value_col;
    });
    if (filter_vars.indexOf(statusControl.value_col) == -1) {
      controlInputs.push(statusControl);
    }
  }

  if (settings.filter_cols) {
    settings.filter_cols.forEach(function (d, i) {
      var thisFilter = {
        type: "subsetter",
        value_col: d,
        multiple: true
      };
      thisFilter.label = settings.filter_labels[i] ? settings.filter_labels[i] : null;
      var filter_vars = controlInputs.map(function (d) {
        return d.value_col;
      });
      if (filter_vars.indexOf(thisFilter.value_col) == -1) {
        controlInputs.push(thisFilter);
      }
    });
  }
  return controlInputs;
}

function onInit() {
    var chart = this;
    this.raw_data.forEach(function (d) {
        d.FormField = d[chart.config.form_col] + ": " + d[chart.config.field_col];
    });
}

function onLayout() {
            var chart = this;
            this.controls.wrap.selectAll(".control-group").filter(function (d) {
                        return d.label == "Group By: ";
            }).selectAll("select").on("change", function () {
                        var value = d3.select(this).property("value");
                        chart.config.marks[0].per[0] = value;
                        chart.config.marks[1].per[0] = value;
                        chart.config.y.column = value;
                        chart.draw();
            });

            var groupToggles = this.controls.wrap.selectAll(".control-group").filter(function (d) {
                        return d.label == "Show first N results";
            }).selectAll('input[type="radio"]');

            groupToggles.property('checked', function (d, i) {
                        return d == 10;
            });

            groupToggles.on('change', function () {

                        var value = groupToggles.filter(function (f) {
                                    return d3.select(this).property('checked');
                        }).property('value');
                        console.log(value);
                        chart.config.cutoff = value == "All" ? chart.raw_data.length : +value;
                        chart.draw();
            });
}

function onPreprocess() {
    var chart = this;
}

function onDataTransform() {
    var chart = this;
}

function onDraw() {
    var chart = this;
    console.log(this.config.y.column);
    console.log(this.config.marks[0].per);

    this.current_data.sort(function (a, b) {
        return b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
    });

    this.y_dom.sort(function (a, b) {
        var order = chart.current_data.map(function (d) {
            return d.key;
        });
        return order.indexOf(b) < order.indexOf(a) ? -1 : order.indexOf(b) > order.indexOf(a) ? 1 : order.indexOf(b) >= order.indexOf(a) ? 0 : NaN;
    });

    this.y_dom = this.y_dom.filter(function (d, i) {
        return chart.current_data.map(function (d) {
            return d.key;
        }).indexOf(d) > -1;
    });

    this.y_dom = this.y_dom.filter(function (d, i) {
        return i >= chart.y_dom.length - chart.config.cutoff;
    });

    this.y_dom = this.config.alphabetize ? this.y_dom.sort(d3.descending) : this.y_dom;

    //change chart height to match the current number of bars displayed
    this.raw_height = (+this.config.range_band + this.config.range_band * this.config.padding) * this.y_dom.length;
}

function onResize() {
    var _this = this;

    var chart = this;
    var textMarks = d3.select("g.text-supergroup").selectAll("text").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
    });
    var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
    });

    /*------------------------------------------------------------------------------------------------\
      Update this section to reference 'Form' and 'Field' instead of `this.config.form_col` and
      'FormField' after merging https://github.com/RhoInc/query-overview/pull/11.
    \------------------------------------------------------------------------------------------------*/

    //Plot data by field when viewing data by form.
    if (this.config.y.column === this.config.form_col) {
        var yLabels = this.svg.selectAll('.y.axis .tick');
        yLabels.style('cursor', 'pointer').on('click', function (yLabel) {
            _this.config.y.column = 'FormField';
            _this.config.marks[0].per[0] = 'FormField';
            _this.config.marks[1].per[0] = 'FormField';
            _this.controls.wrap.selectAll('.control-group').filter(function (d) {
                return (/^Form/.test(d.label)
                );
            }).selectAll('option').filter(function (d) {
                return d === yLabel;
            }).property('selected', true);
            _this.controls.wrap.selectAll('.control-group').filter(function (d) {
                return (/^Group/.test(d.label)
                );
            }).selectAll('option').filter(function (d) {
                return d === 'FormField';
            }).property('selected', true);
            _this.draw(_this.filtered_data.filter(function (d) {
                return d[_this.config.form_col] === yLabel;
            }));
        });
    }
}

function queryOverview(element, settings) {

	//merge user's settings with defaults
	var mergedSettings = Object.assign({}, defaultSettings, settings);

	//keep settings in sync with the data mappings
	mergedSettings = syncSettings(mergedSettings);

	//keep control inputs in sync and create controls object 
	var syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
	var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });

	//create chart
	var chart = webcharts.createChart(element, mergedSettings, controls);
	chart.on('init', onInit);
	chart.on('layout', onLayout);
	chart.on('preprocess', onPreprocess);
	chart.on('datatransform', onDataTransform);
	chart.on('draw', onDraw);
	chart.on('resize', onResize);

	return chart;
}

return queryOverview;

}(webCharts));
