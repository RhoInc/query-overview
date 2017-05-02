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

d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

d3.selection.prototype.moveToBack = function () {
    return this.each(function () {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) this.parentNode.insertBefore(this, firstChild);
    });
};

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
    details: null,
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
    if (syncedSettings.filters) {
        syncedSettings.filters.forEach(function (filter) {
            var value_col = filter.value_col || filter;
            var label = filter.label || filter.value_col || filter;
            if (syncedSettings.groups.map(function (d) {
                return d.value_col;
            }).indexOf(value_col) === -1) syncedSettings.groups.push({ value_col: value_col,
                label: label });
        });
    }

    //Format details argument.
    if (Array.isArray(syncedSettings.details && syncedSettings.details && syncedSettings.details.length)) syncedSettings.details = syncedSettings.details.map(function (detail) {
        var detailObject = {};
        detailObject.value_col = detail.value_col || detail;
        detailObject.label = detail.label || detailObject.value_col;
        console.log(detailObject);

        return detailObject;
    });else syncedSettings.details = null;

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
            filterObject.label = filter.label || filter.value_col;
            filterObject.description = 'filter';
            syncedControlInputs.splice(2, 0, filterObject);
        });
    }

    return syncedControlInputs;
}

function onInit() {
    var chart = this;

    //Define detail listing settings.
    this.listing.config.cols = this.config.details ? this.config.details.map(function (d) {
        return d.value_col;
    }) : Object.keys(this.raw_data[0]);
    this.listing.config.headers = this.config.details ? this.config.details.map(function (d) {
        return d.label;
    }) : Object.keys(this.raw_data[0]);
    if (!this.config.details) {
        this.listing.config.headers[this.listing.config.headers.indexOf(this.config.form_col)] = 'Form';
        this.listing.config.headers[this.listing.config.headers.indexOf(this.config.field_col)] = 'Field';
        this.listing.config.headers[this.listing.config.headers.indexOf(this.config.status_col)] = 'Status';
    }

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
    var _this = this;

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

    //Reset listing.
    this.listing.draw([]);
    this.svg.selectAll('.bar').classed('selected', false).style({ 'stroke-width': '1px',
        'fill': function fill(d) {
            return _this.colorScale(d.key);
        } });
}

function onResize() {
    var _this = this;

    var chart = this;

    //Hide bars that aren't in first N groups.
    this.svg.select("g.bar-supergroup").selectAll("g.bar-group").attr("display", function (d, i) {
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
            _this.draw(_this.filtered_data.filter(function (d) {
                return d[_this.config.form_col] === yLabel;
            }));
        });
    }

    //Add bar click-ability.
    var barGroups = this.svg.selectAll('.bar-group'),
        bars = this.svg.selectAll('.bar'),
        mouseoverStyle = { 'stroke-width': '5px',
        'fill': 'black' },
        mouseoutStyle = { 'stroke-width': '1px',
        'fill': function fill(d) {
            return chart.colorScale(d.key);
        } };
    bars.style('cursor', 'pointer').on('mouseover', function () {
        d3.select(this).style(mouseoverStyle).moveToFront();
    }).on('mouseout', function () {
        if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoutStyle);
        bars.filter(function () {
            return d3.select(this).classed('selected');
        }).moveToFront();
    }).on('click', function (d) {
        bars.classed('selected', false).style(mouseoutStyle);
        d3.select(this).classed('selected', true).style(mouseoverStyle);
        chart.listing.draw(d.values.raw);
    });
}

function onInit$1() {
    var listing = this;
}

function onLayout$1() {
    var listing = this;
}

function onPreprocess$1() {
    var listing = this;
}

function onDataTransform$1() {
    var listing = this;
}

function onDraw$1() {
    var _this = this;

    var listing = this;

    if (this.current_data.length) {
        this.wrap.select('#listing-instruction').remove();
        this.wrap.select('#clear-listing').remove();
        this.wrap.insert('button', ':first-child').attr('id', 'clear-listing').style({ 'margin': '5px',
            'padding': '5px',
            'float': 'right' }).text('Clear listing').on('click', function () {
            _this.draw([]);
            _this.chart.svg.selectAll('.bar').style({ 'stroke-width': '1px',
                'fill': function fill(d) {
                    return _this.chart.colorScale(d.key);
                } });
        });
        this.wrap.insert('em', ':first-child').attr('id', 'listing-instruction').text(this.current_data[0].values.length + ' records are displayed below.');
    } else {
        this.wrap.select('#listing-instruction').remove();
        this.wrap.select('#clear-listing').remove();
        this.wrap.insert('em', ':first-child').attr('id', 'listing-instruction').text('Click a bar to view its underlying data.');
    }

    /**-------------------------------------------------------------------------------------------\
      Listing aesthetics
    \-------------------------------------------------------------------------------------------**/

    //Table
    this.table.attr({ 'width': '100%' }).style({ 'border-collapse': 'collapse' });
    //Header
    this.table.select('thead tr').style({ 'border-bottom': '1px solid black' }).selectAll('th').style({ 'text-align': 'left',
        'padding': '5px' });
    //Body
    this.table.selectAll('tbody tr').style({ 'background': function background(d, i) {
            return i % 2 ? '#eee' : 'white';
        } }).selectAll('td').style({ 'text-align': 'left',
        'padding': '3px 5px' });
}

function onResize$1() {
    var listing = this;
}

//chart callbacks
//listing callbacks
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

  //create listing
  var listing = webcharts.createTable(element, {});
  listing.on('init', onInit$1);
  listing.on('layout', onLayout$1);
  listing.on('preprocess', onPreprocess$1);
  listing.on('datatransform', onDataTransform$1);
  listing.on('draw', onDraw$1);
  listing.on('resize', onResize$1);
  listing.init([]);

  chart.listing = listing;
  listing.chart = chart;

  return chart;
}

return queryOverview;

}(webCharts));
