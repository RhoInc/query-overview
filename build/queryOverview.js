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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function clone(obj) {
    var copy = void 0;

    //boolean, number, string, null, undefined
    if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj) return obj;

    //date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy [obj]! Its type is not supported.');
}

var defaultSettings = {
    //custom settings
    form_col: 'form',
    formDescription_col: null,
    field_col: 'field',
    fieldDescription_col: null,
    status_col: 'status',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    groups: null, // array of objects with value_col/label properties
    filters: null, // array of objects with value_col/label properties
    cutoff: 10,
    alphabetize: false,

    //webcharts settings
    'x': {
        'label': '# of Queries',
        'behavior': 'flex'
    },
    'y': {
        'type': 'ordinal',
        'column': 'Form',
        'sort': 'total-descending'
    },
    'marks': [{
        'type': 'bar',
        'per': ['Form'],
        'split': 'Status',
        'arrange': 'stacked',
        'summarizeX': 'count',
        'tooltip': '[Status] - $x queries'
    }],
    color_by: 'Status',
    color_dom: null, // set in syncSettings()
    legend: {
        location: 'top',
        label: 'Query Status',
        order: null // set in syncSettings()
    },
    range_band: 15,
    margin: { 'right': '50' } // room for count annotation
};

// Replicate settings in multiple places in the settings object
function syncSettings(settings) {
    var syncedSettings = clone(settings),
        groups = [{ value_col: settings.form_col, label: 'Form' },, { value_col: settings.field_col, label: 'Field' },, { value_col: settings.status_col, label: 'Status' },, { value_col: 'Form: Field', label: 'Form: Field' }];

    syncedSettings.color_dom = syncedSettings.status_order;
    syncedSettings.legend.order = syncedSettings.status_order;

    //Merge default group settings with custom group settings.
    if (syncedSettings.groups) syncedSettings.groups.forEach(function (group) {
        return groups.push({ value_col: group.value_col || group,
            label: group.label || group.value_col || group });
    });
    syncedSettings.groups = groups;

    //Add filters to group-by control.
    if (syncedSettings.filters) syncedSettings.filters.forEach(function (filter) {
        var value_col = filter.value_col || filter;
        var label = filter.label || filter.value_col || filter;
        if (syncedSettings.groups.map(function (d) {
            return d.value_col;
        }).indexOf(value_col) === -1) syncedSettings.groups.push({ value_col: value_col,
            label: label });
    });

    return syncedSettings;
}

// Default Control objects
var controlInputs = [{ type: 'dropdown',
    options: ['y.column', 'y.label', 'marks.0.per.0'],
    label: 'Group by',
    description: 'variable toggle',
    values: [] // set in syncControlInputs
    , require: true }, { type: 'subsetter',
    value_col: 'Form',
    label: 'Form',
    description: 'filter' }, { type: 'subsetter',
    value_col: 'Status',
    label: 'Status',
    description: 'filter',
    multiple: true }, { type: 'radio',
    option: 'marks.0.arrange',
    label: 'Bar Arrangement',
    values: ['stacked', 'grouped'] }, { type: 'radio',
    option: 'cutoff',
    label: 'Show first N groups',
    values: ['10', '25', 'All'] }, { type: 'checkbox',
    option: 'alphabetize',
    label: 'Alphabetical?' }];

// Map values from settings to control inputs
function syncControlInputs(controlInputs, settings) {
    var syncedControlInputs = clone(controlInputs);

    //Add groups to group-by control values.
    var groupByControl = syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Group by';
    })[0];
    settings.groups.forEach(function (group) {
        return groupByControl.values.push(group.label);
    });

    //Add filters to control inputs and group-by control values.
    if (settings.filters) {
        var filters = clone(settings.filters);
        filters.reverse().forEach(function (filter) {
            //Define filter and add to control inputs.
            var filterObject = {};
            filterObject.type = 'subsetter';
            filterObject.value_col = filter.value_col || filter;
            filterObject.label = filter.label || filter.value_col || filter;
            filterObject.description = 'filter';
            syncedControlInputs.splice(2, 0, filterObject);
        });
    }

    return syncedControlInputs;
}

function onInit() {
    var chart = this;

    //Define new variables.
    this.raw_data.forEach(function (d) {
        d['Form: Field'] = d[chart.config.form_col] + ": " + d[chart.config.field_col];

        //Redefine group-by variables with their labels.
        chart.config.groups.forEach(function (group) {
            if (group.value_col !== group.label) {
                d[group.label] = d[group.value_col];
            }
        });
    });
}

function onLayout() {
    var chart = this;

    //Handle y-domain length control
    var groupToggles = this.controls.wrap.selectAll(".control-group").filter(function (d) {
        return d.label == "Show first N groups";
    }).selectAll('input[type="radio"]');
    groupToggles.property('checked', function (d, i) {
        return d == 10;
    });
    groupToggles.on('change', function () {
        var value = groupToggles.filter(function (f) {
            return d3.select(this).property('checked');
        }).property('value');
        chart.config.cutoff = value == "All" ? chart.raw_data.length : +value;
        chart.draw();
    });
}

function onPreprocess() {
    var _this = this;

    var chart = this;

    var barArrangementControl = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label === 'Bar Arrangement';
    });
    if (this.config.y.column === 'Status') {
        this.config.marks[0].arrange = 'stacked';
        barArrangementControl.selectAll('.radio').filter(function (d) {
            return d === 'stacked';
        }).select('input').property('checked', true);
        barArrangementControl.selectAll('input').property('disabled', true);
    } else barArrangementControl.selectAll('input').property('disabled', false);

    //Change rangeBand() depending on bar arrangement.
    var max = 0;
    var test = d3.nest().key(function (d) {
        return d[_this.config.y.column];
    }).key(function (d) {
        return d[_this.config.color_by];
    }).rollup(function (d) {
        max = Math.max(max, d.length);
        return d.length;
    }).entries(this.raw_data);
    if (this.config.marks[0].arrange === 'stacked') {
        this.config.range_band = 15;
        this.config.x.domain = [0, null];
    } else {
        this.config.range_band = 60;
        this.config.x.domain = [0, max];
    }
}

function onDataTransform() {
    var chart = this;
}

function onDraw() {
    var chart = this;

    //Sort summarized data by descending total.
    this.current_data.sort(function (a, b) {
        return b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
    });

    //Sort y-domain by descending total.
    this.y_dom.sort(function (a, b) {
        var order = chart.current_data.map(function (d) {
            return d.key;
        });
        return order.indexOf(b) < order.indexOf(a) ? -1 : order.indexOf(b) > order.indexOf(a) ? 1 : order.indexOf(b) >= order.indexOf(a) ? 0 : NaN;
    });

    //Limit y-domain to key values in summarized data.
    this.y_dom = this.y_dom.filter(function (d, i) {
        return chart.current_data.map(function (d) {
            return d.key;
        }).indexOf(d) > -1;
    });

    //Limit y-domain to first [chart.config.cutoff] values.
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

    //Hide bars that aren't in first N groups.
    var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
    });

    //Annotate # of Queries.
    this.svg.selectAll('.number-of-queries').remove();
    if (this.config.marks[0].arrange === 'stacked') this.svg.selectAll('.bar-group').each(function (d) {
        if (chart.y_dom.indexOf(d.key) > -1) d3.select(this).append('text').classed('number-of-queries', true).attr({ x: chart.x(d.total),
            y: chart.y(d.key) + chart.y.rangeBand() / 2,
            dx: '0.25em',
            dy: '0.3em' }).style('font-size', '80%').text(d.total);
    });else this.svg.selectAll('.bar-group').each(function (d) {
        var barGroup = d3.select(this);
        barGroup.selectAll('.bar').each(function (di, i) {
            if (chart.y_dom.indexOf(di.values.y) > -1) barGroup.append('text').classed('number-of-queries', true).attr({ x: chart.x(di.values.x),
                y: chart.y(di.values.y) + chart.y.rangeBand() * i / 4,
                dx: '0.25em',
                dy: '1em' }).style('font-size', '80%').text(di.values.x);
        });
    });

    //Plot data by field when viewing data by form.
    if (this.config.y.column === 'Form') {
        var yLabels = this.svg.selectAll('.y.axis .tick');
        yLabels.style('cursor', 'pointer').on('click', function (yLabel) {
            _this.config.y.column = 'Field';
            _this.config.marks[0].per[0] = 'Field';
            _this.controls.wrap.selectAll('.control-group').filter(function (d) {
                return d.label === 'Form';
            }).selectAll('option').filter(function (d) {
                return d === yLabel;
            }).property('selected', true);
            _this.controls.wrap.selectAll('.control-group').filter(function (d) {
                return d.label === 'Group by';
            }).selectAll('option').filter(function (d) {
                return d === 'Field';
            }).property('selected', true);
            _this.filters.filter(function (filter) {
                return filter.col === 'Form';
            })[0].val = yLabel;
            _this.config.y.label = 'Field';
            _this.draw(_this.filtered_data.filter(function (d) {
                return d[_this.config.form_col] === yLabel;
            }));
        });
    }

    //Add y-tick-label tooltips.
    if (this.config.y.column === 'Form' && this.config.formDescription_col) this.svg.selectAll('.y.axis .tick').filter(function (form) {
        return _this.y_dom.indexOf(form) > -1;
    }).append('title').text(function (form) {
        return _this.raw_data.filter(function (d) {
            return d.Form === form;
        })[0][_this.config.formDescription_col];
    });
    if (this.config.y.column === 'Field' && this.config.fieldDescription_col) this.svg.selectAll('.y.axis .tick').filter(function (field) {
        return _this.y_dom.indexOf(field) > -1;
    }).append('title').text(function (field) {
        return _this.raw_data.filter(function (d) {
            return d.Field === field;
        })[0][_this.config.fieldDescription_col];
    });
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
