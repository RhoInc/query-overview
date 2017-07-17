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

    form_col: 'Datastr',
    formDescription_col: 'Form',
    field_col: 'Field Name',
    fieldDescription_col: 'Field',
    status_col: 'Query Status',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    site_col: 'Site Name',
    groups: null, // array of objects with value_col/label properties
    filters: null,
    details: null, //array of detail columns
    cutoff: 10,
    alphabetize: false,
    exportData: false,

    //webcharts settings
    x: {
        label: '# of Queries',
        behavior: 'flex'
    },
    y: {
        type: 'ordinal',
        column: null, // set in syncSettings()
        label: 'Form',
        sort: 'total-descending'
    },

    marks: [{
        type: 'bar',
        per: [null], // set in syncSettings()
        split: null, // set in syncSettings()
        arrange: 'stacked',
        summarizeX: 'count',
        tooltip: null // set in syncSettings()
    }],
    color_by: null, // set in syncSettings()
    color_dom: null, // set in syncSettings()
    legend: {
        location: 'top',
        label: 'Query Status',
        order: null // set in syncSettings()
    },
    range_band: 15,
    margin: { right: '50' } // room for count annotation
};

// Replicate settings in multiple places in the settings object
function syncSettings(settings) {
    var syncedSettings = clone(settings),
        groups = [{ value_col: settings.form_col, label: 'Form' }, { value_col: 'Form: Field', label: 'Form: Field' }, { value_col: settings.status_col, label: 'Status' }, { value_col: settings.site_col, label: 'Site' }];

    syncedSettings.y.column = syncedSettings.form_col;
    syncedSettings.marks[0].per[0] = syncedSettings.form_col;
    syncedSettings.marks[0].split = syncedSettings.status_col;
    syncedSettings.marks[0].tooltip = '[' + syncedSettings.status_col + '] - $x queries';
    syncedSettings.color_by = syncedSettings.status_col;
    syncedSettings.color_dom = syncedSettings.status_order;
    syncedSettings.legend.order = syncedSettings.status_order;

    //Merge default group settings with custom group settings.
    if (syncedSettings.groups) syncedSettings.groups.forEach(function (group) {
        if (groups.map(function (defaultGroup) {
            return defaultGroup.value_col;
        }).indexOf(group.value_col || group) === -1) groups.push({
            value_col: group.value_col || group,
            label: group.label || group.value_col || group
        });
    });
    syncedSettings.groups = groups;

    //Add filters to group-by control.
    if (syncedSettings.filters) {
        syncedSettings.filters.forEach(function (filter) {
            var value_col = filter.value_col || filter;
            var label = filter.label || filter.value_col || filter;
            if (syncedSettings.groups.map(function (d) {
                return d.value_col;
            }).indexOf(value_col) === -1) syncedSettings.groups.push({
                value_col: value_col,
                label: label
            });
        });
    }

    //Format details argument.
    if (Array.isArray(syncedSettings.details) && syncedSettings.details && syncedSettings.details.length) syncedSettings.details = syncedSettings.details.map(function (detail) {
        var detailObject = {};
        detailObject.value_col = detail.value_col || detail;
        detailObject.label = detail.label || detailObject.value_col;

        return detailObject;
    });else syncedSettings.details = null;

    //Check cutoff argument and set to 10 if invalid.
    if (!(+syncedSettings.cutoff > 0 || syncedSettings.cutoff === 'All')) syncedSettings.cutoff = 10;

    return syncedSettings;
}

// Default Control objects
var controlInputs = [{
    type: 'dropdown',
    option: 'y.label',
    label: 'Group by',
    description: 'variable toggle',
    values: [], // set in syncControlInputs
    require: true
}, {
    type: 'subsetter',
    value_col: null, // set in syncControlInputs()
    label: 'Form',
    description: 'filter'
}, {
    type: 'subsetter',
    value_col: null, // set in syncControlInputs()
    label: 'Status',
    description: 'filter',
    multiple: true
}, {
    type: 'subsetter',
    value_col: null, // set in syncControlInputs()
    label: 'Site',
    description: 'filter',
    multiple: true
}, {
    type: 'radio',
    option: 'marks.0.arrange',
    label: 'Bar Arrangement',
    values: ['stacked', 'grouped']
}, {
    type: 'radio',
    option: 'cutoff',
    label: 'Show first N groups',
    values: ['10', '25', 'All']
}, {
    type: 'checkbox',
    option: 'alphabetize',
    label: 'Alphabetical?'
}];

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

    //Set value_col of Form filter.
    syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Form';
    })[0].value_col = settings.form_col;

    //Set value_col of Form filter.
    syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Site';
    })[0].value_col = settings.site_col;

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

    //Set value_col of Status filter.
    syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Status';
    })[0].value_col = settings.status_col;

    //Add cutoff argument to Show first N groups control if not already a default value.
    var nGroupsControl = syncedControlInputs.filter(function (controlInput) {
        return controlInput.label === 'Show first N groups';
    })[0];
    if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
        nGroupsControl.values.push(settings.cutoff.toString());
        nGroupsControl.values.sort(function (a, b) {
            return a === 'All' ? 1 : b === 'All' ? -1 : +a - +b;
        });
    }

    return syncedControlInputs;
}

function onInit() {
    var chart = this;

    //Define detail listing settings.
    this.listing.config.cols = this.config.details ? this.config.details.map(function (d) {
        return d.value_col;
    }) : Object.keys(this.raw_data[0]).filter(function (key) {
        return key !== 'Form: Field';
    });
    this.listing.config.headers = this.config.details ? this.config.details.map(function (d) {
        return d.label;
    }) : Object.keys(this.raw_data[0]).filter(function (key) {
        return key !== 'Form: Field';
    });

    //Define new variables.
    this.raw_data.forEach(function (d) {
        d['Form: Field'] = d[chart.config.form_col] + ': ' + d[chart.config.field_col];
    });
}

function onLayout() {
    var _this = this;

    var chart = this;

    this.wrap.style('overflow', 'hidden');

    //Handle y-domain length control
    var groupToggles = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label == 'Show first N groups';
    }).selectAll('input[type="radio"]');
    groupToggles.property('checked', function (d, i) {
        return d == chart.config.cutoff;
    });
    this.config.cutoff = this.config.cutoff === 'All' ? this.raw_data.length : +this.config.cutoff;
    groupToggles.on('change', function () {
        var value = groupToggles.filter(function (f) {
            return d3.select(this).property('checked');
        }).property('value');
        chart.config.cutoff = value == 'All' ? chart.raw_data.length : +value;
        chart.draw();
    });

    //Sync status filter with legend items.
    var statusFilter = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label === 'Status';
    });
    statusFilter.on('change', function () {
        var selectedOptions = statusFilter.select('.changer').selectAll('option:checked').data(),
            // selected statuses
        legendItems = chart.wrap.selectAll('.legend-item').classed('selected', false),
            // de-select all legend items
        selectedLegendItems = legendItems.filter(function (d) {
            return selectedOptions.indexOf(d.label) > -1;
        }).classed('selected', true); // sync legend items with status options
        legendItems.each(function () {
            var legendItem = d3.select(this),
                selected = legendItem.classed('selected');
            legendItem.style({ background: selected ? 'lightgray' : 'white' });
        });
    });

    //Add download link.
    if (this.config.exportData) this.controls.wrap.insert('a', ':first-child').attr('id', 'downloadCSV').style({
        'text-decoration': 'underline',
        color: 'blue',
        cursor: 'pointer',
        float: 'right',
        margin: '5px',
        padding: '5px',
        clear: 'right'
    }).text('Download Query Data');

    //Add reset button.
    this.controls.wrap.insert('button', ':first-child').attr('id', 'reset-chart').style({
        margin: '5px',
        padding: '5px',
        float: 'right'
    }).text('Reset chart').on('click', function () {
        var element = clone(_this.div),
            settings = clone(_this.initialSettings),
            data = clone(_this.raw_data);
        _this.listing.destroy();
        _this.destroy();
        queryOverview(element, settings).init(data);
    });

    //Display group label rather than group column name in Group by control.
    var groupByControl = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label === 'Group by';
    }).on('change', function () {
        var label = d3.select(this).select('option:checked').text(),
            value_col = chart.config.groups[chart.config.groups.map(function (d) {
            return d.label;
        }).indexOf(label)].value_col;

        chart.config.y.column = value_col;
        chart.config.marks[0].per = [value_col];
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

    //Attach current filtered data to download link.
    if (this.config.exportData) {
        var CSVarray = [];

        this.filtered_data.forEach(function (d, i) {
            //add headers to CSV array
            if (i === 0) {
                var headers = Object.keys(d).filter(function (header) {
                    return header !== 'Form: Field';
                }).map(function (key) {
                    return '"' + key.replace(/"/g, '""') + '"';
                });
                CSVarray.push(headers);
            }

            //add rows to CSV array
            var row = Object.keys(d).filter(function (key) {
                return key !== 'Form: Field';
            }).map(function (key) {
                if (typeof d[key] === 'string') d[key] = d[key].replace(/"/g, '""');

                return '"' + d[key] + '"';
            });

            CSVarray.push(row);
        });

        //transform CSV array into CSV string
        var CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' }),
            fileName = 'queries.csv',
            link = chart.controls.wrap.select('#downloadCSV');

        if (navigator.msSaveBlob) {
            // IE 10+
            link.style({
                cursor: 'pointer',
                'text-decoration': 'underline',
                color: 'blue'
            });
            link.on('click', function () {
                navigator.msSaveBlob(CSV, fileName);
            });
        } else {
            // Browsers that support HTML5 download attribute
            if (link.node().download !== undefined) {
                // feature detection
                var url = URL.createObjectURL(CSV);
                link.node().setAttribute('href', url);
                link.node().setAttribute('download', fileName);
            }
        }
    }
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
    this.svg.selectAll('.bar').classed('selected', false).style({
        'stroke-width': '1px',
        fill: function fill(d) {
            return _this.colorScale(d.key);
        }
    });
}

function onResize() {
    var _this = this;

    var chart = this;

    //Hide bars that aren't in first N groups.
    this.svg.select('g.bar-supergroup').selectAll('g.bar-group').attr('display', function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : 'none';
    });

    //Annotate # of Queries.
    this.svg.selectAll('.number-of-queries').remove();
    if (this.config.marks[0].arrange === 'stacked') {
        this.current_data.forEach(function (d) {
            if (chart.y_dom.indexOf(d.key) > -1) {
                chart.svg.append('text').classed('number-of-queries', true).attr({
                    x: chart.x(d.total),
                    y: chart.y(d.key) + chart.y.rangeBand() / 2,
                    dx: '0.25em',
                    dy: '0.3em'
                }).style('font-size', '80%').text(d.total);
            }
        });
    } else {
        this.current_data.forEach(function (d) {
            if (chart.y_dom.indexOf(d.key) > -1) {
                d.values.forEach(function (di) {
                    chart.svg.append('text').classed('number-of-queries', true).attr({
                        x: chart.x(di.values.x),
                        y: chart.y(d.key) + chart.y.rangeBand() * (3 - chart.config.status_order.indexOf(di.key)) / 4,
                        dx: '0.25em',
                        dy: '1em'
                    }).style('font-size', '80%').text(di.values.x);
                });
            }
        });
    }

    //Plot data by field when viewing data by form.
    if (this.config.y.column === this.config.form_col) {
        var yLabels = this.svg.selectAll('.y.axis .tick').style('fill', 'blue').style('text-decoration', 'underline');
        yLabels.style('cursor', 'pointer').on('click', function (yLabel) {
            _this.controls.wrap.selectAll('.control-group').filter(function (d) {
                return d.label === 'Group by';
            }).selectAll('option').property('selected', function (d) {
                return d === 'Form: Field';
            });
            _this.config.y.column = 'Form: Field';
            _this.config.y.label = 'Form: Field';
            _this.config.marks[0].per[0] = 'Form: Field';
            _this.controls.wrap.selectAll('.control-group').filter(function (d) {
                return d.label === 'Form';
            }).selectAll('option').property('selected', function (d) {
                return d === yLabel;
            });
            _this.filters.filter(function (filter) {
                return filter.col === _this.config.form_col;
            })[0].val = yLabel;

            _this.draw(_this.filtered_data.filter(function (d) {
                return d[_this.config.form_col] === yLabel;
            }));
        });
    }

    //Add bar click-ability.
    var barGroups = this.svg.selectAll('.bar-group'),
        bars = this.svg.selectAll('.bar'),
        mouseoverStyle = {
        'stroke-width': '5px',
        fill: 'black'
    },
        mouseoutStyle = {
        'stroke-width': '1px',
        fill: function fill(d) {
            return chart.colorScale(d.key);
        }
    };
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

    //Filter data by clicking on legend.
    var legendItems = this.wrap.selectAll('.legend-item').style({
        cursor: 'pointer',
        'border-radius': '4px',
        padding: '5px',
        'padding-left': '8px'
    }),
        // legend items
    statusOptions = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label === 'Status';
    }).selectAll('.changer option'); // status filter options
    legendItems.selectAll('.legend-mark-text').remove(); // don't need 'em
    legendItems.on('click', function (d) {
        var legendItem = d3.select(this),
            // clicked legend item
        selected = !legendItem.classed('selected'); // selected boolean
        legendItem.classed('selected', selected); // toggle selected class
        var selectedLegendItems = legendItems.filter(function () {
            return d3.select(this).classed('selected');
        }).data().map(function (d) {
            return d.label;
        }); // selected statuses
        legendItem.style({
            background: selected ? 'lightgray' : 'white'
        }); // set background of legend items corresponding to selected statuses to light gray
        statusOptions.property('selected', false).filter(function (d) {
            return selectedLegendItems.indexOf(d) > -1;
        }).property('selected', true); // set selected property of status options corresponding to selected statuses to true
        var filtered_data = chart.raw_data.filter(function (d) {
            var filtered = selectedLegendItems.indexOf(d[chart.config.status_col]) === -1;

            chart.filters.filter(function (filter) {
                return filter.col !== chart.config.status_col;
            }).forEach(function (filter) {
                if (filtered === false && filter.val !== 'All') filtered = typeof filter.val === 'string' ? d[filter.col] !== filter.val : filter.val.indexOf(d[filter.col]) === -1;
            });

            return !filtered;
        }); // define filtered data
        chart.filters.filter(function (filter) {
            return filter.col === chart.config.status_col;
        })[0].val = selectedLegendItems; // update chart's status filter object
        chart.draw(filtered_data);
    });

    //Add y-tick-label tooltips.
    if (this.config.y.column === this.config.form_col) this.svg.selectAll('.y.axis .tick').filter(function (form) {
        return _this.y_dom.indexOf(form) > -1;
    }).append('title').text(function (form) {
        return 'Form: ' + (_this.raw_data.filter(function (d) {
            return d[_this.config.form_col] === form;
        })[0][_this.config.formDescription_col] || form);
    });
    if (this.config.y.column === 'Form: Field') this.svg.selectAll('.y.axis .tick').style('cursor', 'help').filter(function (field) {
        return _this.y_dom.indexOf(field) > -1;
    }).append('title').text(function (field) {
        var datum = _this.raw_data.filter(function (d) {
            return d['Form: Field'] === field;
        })[0];
        return 'Form: ' + (datum[_this.config.formDescription_col] || datum[_this.config.form_col]) + '\nField: ' + (datum[_this.config.fieldDescription_col] || datum[_this.config.field_col]);
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
        this.wrap.insert('button', ':first-child').attr('id', 'clear-listing').style({
            margin: '5px',
            padding: '5px',
            float: 'right'
        }).text('Clear listing').on('click', function () {
            _this.draw([]);
            _this.chart.svg.selectAll('.bar').style({
                'stroke-width': '1px',
                fill: function fill(d) {
                    return _this.chart.colorScale(d.key);
                }
            });
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
    this.table.attr({ width: '100%' }).style({ 'border-collapse': 'collapse' });
    //Header
    this.table.select('thead tr').style({ 'border-bottom': '1px solid black' }).selectAll('th').style({
        'text-align': 'left',
        padding: '5px'
    });
    //Body
    this.table.selectAll('tbody tr').style({ background: function background(d, i) {
            return i % 2 ? '#eee' : 'white';
        } }).selectAll('td').style({
        'text-align': 'left',
        padding: '3px 5px'
    });
}

function onResize$1() {
    var listing = this;
}

//chart callbacks
//listing callbacks
function queryOverview$1(element, settings) {
    //merge user's settings with defaults
    var mergedSettings = Object.assign({}, defaultSettings, settings);

    //keep settings in sync with the data mappings
    mergedSettings = syncSettings(mergedSettings);
    var initialSettings = clone(mergedSettings);

    //keep control inputs in sync and create controls object
    var syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });

    //create chart
    var chart = webcharts.createChart(element, mergedSettings, controls);
    chart.initialSettings = initialSettings;
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

return queryOverview$1;

}(webCharts));
