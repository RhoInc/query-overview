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
    field_col: 'field',
    status_col: 'status',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    filters: null,
    groups: null,
    cutoff: 10,
    alphabetize: false,

    //webcharts settings
    'x': {
        'label': '# of Queries',
        'behavior': 'flex'
    },
    'y': {
        'type': 'ordinal',
        'column': null,
        'label': 'Form',
        'sort': 'total-descending'
    },
    'marks': [{
        'type': 'bar',
        'per': [null],
        'split': null,
        'arrange': 'stacked',
        'summarizeX': 'count',
        'tooltip': null
    }],
    color_by: null,
    legend: {
        location: 'top',
        label: 'Query Status' },
    range_band: 15,
    margin: { 'right': '50' } // room for count annotation
};

// Replicate settings in multiple places in the settings object
function syncSettings(settings) {
    var syncedSettings = clone(settings);

    syncedSettings.y.column = syncedSettings.form_col;
    syncedSettings.marks[0].per[0] = syncedSettings.form_col;
    syncedSettings.marks[0].split = syncedSettings.status_col;
    syncedSettings.marks[0].tooltip = syncedSettings.status_col ? '[' + syncedSettings.status_col + '] - $x queries' : '$x queries';
    syncedSettings.color_by = syncedSettings.status_col;
    syncedSettings.color_dom = syncedSettings.status_order;
    syncedSettings.legend.order = syncedSettings.status_order;

    return syncedSettings;
}

// Default Control objects
var controlInputs = [{ type: 'subsetter',
    value_col: null,
    label: 'Form',
    description: 'filter' }, { type: 'subsetter',
    value_col: null,
    label: 'Status',
    description: 'filter',
    multiple: true }, { type: 'dropdown',
    options: ['y.column', 'marks.0.per.0'],
    label: 'Group by',
    description: 'variable toggle',
    values: null,
    require: true }, { type: 'radio',
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

    syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Form';
    })[0].value_col = settings.form_col;
    syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Status';
    })[0].value_col = settings.status_col;

    var groupByControl = syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Group by';
    })[0];

    groupByControl.values = [settings.form_col, settings.field_col, settings.status_col, 'Form: Field'];
    groupByControl.relabels = ['Form', 'Field', 'Status', 'Form: Field'];

    //Add groups to group-by control values.
    if (settings.groups) settings.groups.forEach(function (group) {
        groupByControl.values.push(group.value_col || group);
        groupByControl.relabels.push(group.label || group);
    });

    //Add filters to control inputs and group-by control values.
    if (settings.filters) {
        var filters = clone(settings.filters);
        filters.reverse().forEach(function (filter) {
            //Define filter and add to control inputs.
            filter.type = 'subsetter';
            filter.value_col = filter.value_col || filter;
            filter.label = filter.label || filter;
            filter.description = 'filter';
            syncedControlInputs.splice(1, 0, filter);

            //Add filter variable to group-by control values.
            if (groupByControl.values.indexOf(filter.value_col) === '-1') {
                groupByControl.values.push(filter.value_col || filter);
                groupByControl.relabels.push(filter.label || filter);
            }
        });
    }

    return syncedControlInputs;
}

function onInit() {
    var chart = this;
    this.raw_data.forEach(function (d) {
        d['Form: Field'] = d[chart.config.form_col] + ": " + d[chart.config.field_col];
        if (chart.config.groups) chart.config.groups.forEach(function (group) {
            return d[group.label] = d[group.value_col];
        });
    });
}

function onLayout() {
    var chart = this;

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

    this.svg.selectAll('.number-of-queries').remove();

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
    var chart = this;
    var textMarks = d3.select("g.text-supergroup").selectAll("text").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
    });
    var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
    });

    //Annotate # of Queries.
    if (this.config.marks[0].arrange === 'stacked') this.svg.selectAll('.bar-group').each(function (d) {
        d3.select(this).append('text').classed('number-of-queries', true).attr({ x: chart.x(d.total),
            y: chart.y(d.key) + chart.y.rangeBand() / 2,
            dx: '0.25em',
            dy: '0.3em' }).style('font-size', '80%').text(d.total);
    });else this.svg.selectAll('.bar-group').each(function (d) {
        var barGroup = d3.select(this);
        barGroup.selectAll('.bar').each(function (di, i) {
            barGroup.append('text').classed('number-of-queries', true).attr({ x: chart.x(di.values.x),
                y: chart.y(di.values.y) + chart.y.rangeBand() * i / 4,
                dx: '0.25em',
                dy: '1em' }).style('font-size', '80%').text(di.values.x);
        });
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
