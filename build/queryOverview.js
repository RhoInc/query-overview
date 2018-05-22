(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['d3', 'webcharts'], factory) :
	(global.queryOverview = factory(global.d3,global.webCharts));
}(this, (function (d3$1,webcharts) { 'use strict';

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





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

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

var rendererSettings = {
    form_col: 'Datastr',
    formDescription_col: 'Form',
    field_col: 'Field Name',
    fieldDescription_col: 'Field',
    status_col: 'Query Status',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    status_colors: ['#fb9a99', '#fdbf6f', '#1f78b4', 'gray'],
    aging_col: 'Query Age Category',
    aging_order: null,
    aging_colors: ['#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
    groups: null,
    status_groups: null,
    site_col: 'Site Name',
    filters: null,
    details: null,
    cutoff: 10,
    alphabetize: false,
    exportable: true,
    nRowsPerPage: 10
};

var webchartsSettings = {
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
        //  label: 'Query Status',
        label: null,
        order: null // set in syncSettings()
    },
    range_band: 15,
    margin: { right: '50' // room for count annotation
    } };

function arrayOfVariablesCheck(defaultVariables, userDefinedVariables) {
    var validSetting = userDefinedVariables instanceof Array && userDefinedVariables.length ? d3$1.merge([defaultVariables, userDefinedVariables.filter(function (item) {
        return !(item instanceof Object && item.hasOwnProperty('value_col') === false) && defaultVariables.map(function (d) {
            return d.value_col;
        }).indexOf(item.value_col || item) === -1;
    })]).map(function (item) {
        var itemObject = {};

        itemObject.value_col = item instanceof Object ? item.value_col : item;
        itemObject.label = item instanceof Object ? item.label || itemObject.value_col : itemObject.value_col;

        return itemObject;
    }) : defaultVariables;

    return validSetting;
}

function syncSettings(settings) {
    var syncedSettings = clone(settings);

    //groups
    var defaultGroups = [{ value_col: syncedSettings.form_col, label: 'Form' }, { value_col: 'Form: Field', label: 'Form: Field' }, { value_col: syncedSettings.site_col, label: 'Site' }];
    syncedSettings.groups = arrayOfVariablesCheck(defaultGroups, settings.groups);

    //status_groups
    var defaultStatusGroups = [{
        value_col: syncedSettings.status_col,
        label: 'Query Status',
        order: syncedSettings.status_order,
        colors: syncedSettings.status_colors
    }, {
        value_col: syncedSettings.aging_col,
        label: 'Query Age',
        order: syncedSettings.aging_order,
        colors: syncedSettings.aging_colors
    }];
    syncedSettings.status_groups = arrayOfVariablesCheck(defaultStatusGroups, settings.status_groups);

    //y-axis
    syncedSettings.y.column = syncedSettings.form_col;

    //stratification
    syncedSettings.color_by = syncedSettings.status_groups[0].value_col;
    syncedSettings.color_dom = syncedSettings.status_groups[0].order.slice();
    syncedSettings.colors = syncedSettings.status_groups[0].colors;
    syncedSettings.legend.label = syncedSettings.status_groups[0].label;
    syncedSettings.legend.order = syncedSettings.status_groups[0].order.slice();

    //mark settings
    syncedSettings.marks[0].per[0] = syncedSettings.form_col;
    syncedSettings.marks[0].split = syncedSettings.color_by;
    syncedSettings.marks[0].tooltip = '[' + syncedSettings.color_by + '] - $x queries';

    //filters
    var defaultFilters = [{ value_col: syncedSettings.form_col, label: 'Form' }, { value_col: syncedSettings.site_col, label: 'Site' }];
    syncedSettings.status_groups.forEach(function (status_group) {
        status_group.multiple = true;
        defaultFilters.push(clone(status_group));
    });
    syncedSettings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

    //cutoff
    if (!(+syncedSettings.cutoff > 0 || syncedSettings.cutoff === 'All')) syncedSettings.cutoff = 10;

    //details
    syncedSettings.details = arrayOfVariablesCheck([], settings.details);
    if (syncedSettings.details.length === 0) delete syncedSettings.details;

    return syncedSettings;
}

var controlInputs = [{
    type: 'dropdown',
    option: 'y.label',
    label: 'Group by',
    description: 'variable toggle',
    start: null, // set in syncControlInputs()
    values: null, // set in syncControlInputs
    require: true
}, {
    type: 'dropdown',
    label: 'Status Group',
    description: 'stratification',
    options: ['marks.0.split', 'color_by'], // will want to change tooltip too
    start: null, // set in syncControlInputs()
    values: null, // set in syncControlInputs()
    require: true
}, {
    type: 'radio',
    option: 'marks.0.arrange',
    label: 'Bar Arrangement',
    values: ['stacked', 'grouped']
}, {
    type: 'radio',
    option: 'cutoff',
    label: 'Show First N Groups',
    values: ['10', '25', 'All']
}, {
    type: 'checkbox',
    option: 'alphabetize',
    label: 'Alphabetical?'
}];

function syncControlInputs(controlInputs, settings) {
    var syncedControlInputs = clone(controlInputs);

    //Group by
    var groupByControl = syncedControlInputs.find(function (controlInput) {
        return controlInput.label === 'Group by';
    });
    groupByControl.values = settings.groups.map(function (group) {
        return group.label;
    });

    //Status Group
    var statusGroupControl = syncedControlInputs.find(function (controlInput) {
        return controlInput.label === 'Status Group';
    });
    statusGroupControl.values = settings.status_groups.map(function (status_group) {
        return status_group.value_col;
    });

    //filters
    settings.filters.forEach(function (filter, i) {
        filter.type = 'subsetter';
        filter.description = 'filter';
        syncedControlInputs.splice(2 + i, 0, filter);
    });

    //Show First N Groups
    var nGroupsControl = syncedControlInputs.find(function (controlInput) {
        return controlInput.label === 'Show First N Groups';
    });
    if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
        nGroupsControl.values.push(settings.cutoff.toString());
        nGroupsControl.values.sort(function (a, b) {
            return a === 'All' ? 1 : b === 'All' ? -1 : +a - +b;
        });
    }

    return syncedControlInputs;
}

var configuration = {
    rendererSettings: rendererSettings,
    webchartsSettings: webchartsSettings,
    settings: Object.assign({}, rendererSettings, webchartsSettings),
    syncSettings: syncSettings,
    controlInputs: controlInputs,
    syncControlInputs: syncControlInputs
};

function onInit() {
    var context = this;

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
        d['Form: Field'] = d[context.config.form_col] + ': ' + d[context.config.field_col];
    });

    context.listing.init(context.raw_data);
}

function onLayout() {
    var _this = this;

    var context = this;

    this.wrap.style('overflow', 'hidden');

    //Handle y-domain length control
    var groupToggles = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label == 'Show first N groups';
    }).selectAll('input[type="radio"]');
    groupToggles.property('checked', function (d, i) {
        return d == context.config.cutoff;
    });
    this.config.cutoff = this.config.cutoff === 'All' ? this.raw_data.length : +this.config.cutoff;
    groupToggles.on('change', function () {
        var value = groupToggles.filter(function (f) {
            return d3.select(this).property('checked');
        }).property('value');
        context.config.cutoff = value == 'All' ? context.raw_data.length : +value;
        context.draw();
    });

    //Clear listing when controls change.
    this.controls.wrap.selectAll('.control-group').filter(function (control) {
        return ['dropdown', 'subsetter'].indexOf(control.type) > -1;
    }).on('change', function (d) {
        //Clear bar highlighting.
        context.svg.selectAll('.bar').classed('selected', false).style({
            'stroke-width': '1px',
            fill: function fill(d) {
                return context.colorScale(d.key);
            }
        });

        //Reset listing.
        context.listing.wrap.selectAll('*').remove();
        context.wrap.select('#listing-instruction').style('display', 'block');

        //Sync status filter with legend items.
        if (d.label === 'Status') {
            var statusFilter = d3.select(this),
                selectedOptions = statusFilter.selectAll('.changer option:checked').data(),
                // selected statuses
            legendItems = context.wrap.selectAll('.legend-item').classed('selected', false),
                // de-select all legend items
            selectedLegendItems = legendItems.filter(function (d) {
                return selectedOptions.indexOf(d.label) > -1;
            }).classed('selected', true); // sync legend items with status options

            legendItems.each(function () {
                var legendItem = d3.select(this),
                    selected = legendItem.classed('selected');
                legendItem.style({ background: selected ? 'lightgray' : 'white' });
            });
        }
        context.listing.init(context.filtered_data);
    });

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

    //Add listing instruction.
    this.wrap.append('em').attr('id', 'listing-instruction').text('Click a bar to view its underlying data.');

    //Display group label rather than group column name in Group by control.
    var groupByControl = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.label === 'Group by';
    }).on('change', function () {
        var label = d3.select(this).select('option:checked').text(),
            value_col = context.config.groups[context.config.groups.map(function (d) {
            return d.label;
        }).indexOf(label)].value_col;

        context.config.y.column = value_col;
        context.config.marks[0].per = [value_col];
        context.draw();
    });

    // change options ins ubsetter based on status filter

    //subsetter.data(legendItem).enter().append('option').text(d => d)
}

function updateStratification() {
    var _this = this;

    var stratification = this.config.status_groups.find(function (status_group) {
        return status_group.value_col === _this.config.color_by;
    });
    this.config.color_dom = stratification.order || d3$1.set(this.raw_data.map(function (d) {
        return d[_this.config.color_by];
    })).values().sort();
    this.config.colors = stratification.colors;
    this.config.legend.label = stratification.label;
    this.config.legend.order = this.config.color_dom.slice();
}

function onPreprocess() {
    var _this = this;

    updateStratification.call(this);

    //console.log(context);

    //this.controls.config.inputs.filter(
    //    controlInput => controlInput.label === 'Status'
    //)[0].value_col =
    //    context.config.marks[0].split;

    //this.filters[1].col = context.config.marks[0].split;

    //console.log(context);

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
    
}

function onDraw() {
    var context = this;

    //Sort summarized data by descending total.
    this.current_data.sort(function (a, b) {
        return b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
    });

    //Sort y-domain by descending total.
    this.y_dom.sort(function (a, b) {
        var order = context.current_data.map(function (d) {
            return d.key;
        });
        return order.indexOf(b) < order.indexOf(a) ? -1 : order.indexOf(b) > order.indexOf(a) ? 1 : order.indexOf(b) >= order.indexOf(a) ? 0 : NaN;
    });

    //Limit y-domain to key values in summarized data.
    this.y_dom = this.y_dom.filter(function (d, i) {
        return context.current_data.map(function (d) {
            return d.key;
        }).indexOf(d) > -1;
    });

    //Limit y-domain to first [chart.config.cutoff] values.
    this.y_dom = this.y_dom.filter(function (d, i) {
        return i >= context.y_dom.length - context.config.cutoff;
    });

    this.y_dom = this.config.alphabetize ? this.y_dom.sort(d3.descending) : this.y_dom;

    //change chart height to match the current number of bars displayed
    this.raw_height = (+this.config.range_band + this.config.range_band * this.config.padding) * this.y_dom.length;
}

// from https://gist.github.com/samgiles/762ee337dff48623e729

Array.prototype.flatMap = function (lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

function legendFilter() {
    var _this = this;

    var context = this;

    //Filter data by clicking on legend.
    var statusFilter = this.filters.find(function (filter) {
        return filter.col === _this.config.color_by;
    });
    var legendItems = this.wrap.selectAll('.legend-item').style({
        cursor: 'pointer',
        'border-radius': '4px',
        padding: '5px',
        'padding-left': '8px'
    }).classed('selected', function (d) {
        return statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1;
    }).style('background', function (d) {
        return statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1 ? 'lightgray' : 'white';
    });
    var statusOptions = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.value_col === context.config.marks[0].split;
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
        var filtered_data = context.raw_data.filter(function (d) {
            var filtered = selectedLegendItems.indexOf(d[context.config.marks[0].split]) === -1;

            context.filters.filter(function (filter) {
                return filter.col !== context.config.marks[0].split;
            }).forEach(function (filter) {
                if (filtered === false && filter.val !== 'All') filtered = typeof filter.val === 'string' ? d[filter.col] !== filter.val : filter.val.indexOf(d[filter.col]) === -1;
            });

            return !filtered;
        }); // define filtered data

        context.filters.filter(function (filter) {
            return filter.col === context.config.marks[0].split;
        })[0].val = selectedLegendItems;

        //Clear bar highlighting.
        context.svg.selectAll('.bar').classed('selected', false).style({
            'stroke-width': '1px',
            fill: function fill(d) {
                return context.colorScale(d.key);
            }
        });
        context.draw();

        //Remove listing and display listing instruction.
        context.listing.wrap.selectAll('*').remove();
        context.wrap.select('#listing-instruction').style('display', 'block');
        context.listing.init(filtered_data);
    });
}

function onResize() {
    var _this = this;

    var context = this;

    //Hide bars that aren't in first N groups.
    this.svg.select('g.bar-supergroup').selectAll('g.bar-group').attr('display', function (d, i) {
        return context.y_dom.indexOf(d.key) > -1 ? null : 'none';
    });

    //Annotate # of Queries.
    this.svg.selectAll('.number-of-queries').remove();
    if (this.config.marks[0].arrange === 'stacked') {
        this.current_data.forEach(function (d) {
            if (context.y_dom.indexOf(d.key) > -1) {
                context.svg.append('text').classed('number-of-queries', true).attr({
                    x: context.x(d.total),
                    y: context.y(d.key) + context.y.rangeBand() / 2,
                    dx: '0.25em',
                    dy: '0.3em'
                }).style('font-size', '80%').text(d.total);
            }
        });
    } else {
        this.current_data.forEach(function (d) {
            if (context.y_dom.indexOf(d.key) > -1) {
                d.values.forEach(function (di) {
                    context.svg.append('text').classed('number-of-queries', true).attr({
                        x: context.x(di.values.x),
                        y: context.y(d.key) + context.y.rangeBand() * (3 - context.config.status_order.indexOf(di.key)) / 4,
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
            context.listing.wrap.selectAll('*').remove();
            context.wrap.select('listing-instruction').style('display', 'block');
        });
    }

    //Add bar click-ability.

    var barGroups = this.svg.selectAll('.bar-group'),
        bars = this.svg.selectAll('.bar'),

    // will subtract and add to bar to offset increase in stroke-width and prevent bars
    // from overlapping as much when neighbors are both selected.
    mouseoverAttrib = {
        width: function width(d) {
            return this.getBBox().width - 2.5;
        },
        x: function x(d) {
            return this.getBBox().x + 2.5;
        }
    },
        mouseoverStyle = {
        'stroke-width': '5px',
        fill: 'black'
    },
        mouseoutAttrib = {
        width: function width(d) {
            return this.getBBox().width + 2.5;
        },
        x: function x(d) {
            return this.getBBox().x - 2.5;
        }
    },
        mouseoutStyle = {
        'stroke-width': '1px',
        fill: function fill(d) {
            return context.colorScale(d.key);
        }
    };
    bars.style('cursor', 'pointer').on('mouseover', function () {
        if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoverStyle);
        if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoverAttrib);
        //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
        if (!/trident/i.test(navigator.userAgent)) d3.select(this).moveToFront();
    }).on('mouseout', function () {
        if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoutStyle);
        if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoutAttrib);
        bars.filter(function () {
            return d3.select(this).classed('selected');
        }).moveToFront();
    }).on('click', function (d) {
        // this doesn't need a style because mouseout isn't applied when the bar is selected
        d3.select(this).classed('selected', d3.select(this).classed('selected') ? false : true);
        context.listing.wrap.selectAll('*').remove();
        // feed listing data for all selected bars
        context.listing.init(d3.selectAll('rect.selected').data().flatMap(function (d) {
            return d.values.raw;
        }));
        context.wrap.select('#listing-instruction').style('display', 'none'); // remove bar instructions
        // display filtered data if no bars are selected
        if (d3.selectAll('rect.selected')[0].length === 0) {
            context.listing.wrap.selectAll('*').remove();
            context.wrap.select('#listing-instruction').style('display', 'block');
            context.listing.init(context.filtered_data);
        }
    });

    legendFilter.call(this);

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
    
}

function onLayout$1() {
    var _this = this;

    var context = this;

    this.wrap.insert('button', ':first-child').attr('id', 'clear-listing').style({
        margin: '5px',
        padding: '5px',
        float: 'left',
        display: 'block'
    }).text('Reset listing').on('click', function () {
        _this.wrap.selectAll('*').remove();
        // revert selected bars back to regular width and start
        _this.chart.svg.selectAll('.bar.selected').attr({
            width: function width(d) {
                return this.getBBox().width + 2.5;
            },
            x: function x(d) {
                return this.getBBox().x - 2.5;
            }
        });
        _this.chart.svg.selectAll('.bar').classed('selected', false).style({
            'stroke-width': '1px',
            fill: function fill(d) {
                return _this.chart.colorScale(d.key);
            }
        });
        context.chart.listing.init(context.chart.filtered_data);
        _this.chart.wrap.select('#listing-instruction').style('display', 'block');
    });
    this.table.style('width', '100%').style('display', 'table');
}

function onDraw$1() {
    
}

function onDestroy$1() {
    
}

function queryOverview$1(element, settings) {
    var mergedSettings = Object.assign({}, configuration.settings, settings);
    var syncedSettings = configuration.syncSettings(mergedSettings);
    var syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs, syncedSettings);
    var controls = webcharts.createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    var chart = webcharts.createChart(element, syncedSettings, controls);
    var listing = webcharts.createTable(element, { exportable: syncedSettings.exportable });

    chart.initialSettings = clone(mergedSettings);
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDataTransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    listing.on('init', onInit$1);
    listing.on('layout', onLayout$1);
    listing.on('draw', onDraw$1);
    listing.on('destroy', onDestroy$1);

    chart.listing = listing;
    listing.chart = chart;

    return chart;
}

return queryOverview$1;

})));
