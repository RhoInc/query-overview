(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
            ? define(['d3', 'webcharts'], factory)
            : (global.queryOverview = factory(global.d3, global.webCharts));
})(this, function(d3$1, webcharts) {
    'use strict';

    //[].find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    //{}.assign
    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                // .length of function is 2
                'use strict';

                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    //[].findIndex
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function() {
            this.parentNode.appendChild(this);
        });
    };

    d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) this.parentNode.insertBefore(this, firstChild);
        });
    };

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                      typeof Symbol === 'function' &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    var asyncGenerator = (function() {
        function AwaitValue(value) {
            this.value = value;
        }

        function AsyncGenerator(gen) {
            var front, back;

            function send(key, arg) {
                return new Promise(function(resolve, reject) {
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
                        Promise.resolve(value.value).then(
                            function(arg) {
                                resume('next', arg);
                            },
                            function(arg) {
                                resume('throw', arg);
                            }
                        );
                    } else {
                        settle(result.done ? 'return' : 'normal', result.value);
                    }
                } catch (err) {
                    settle('throw', err);
                }
            }

            function settle(type, value) {
                switch (type) {
                    case 'return':
                        front.resolve({
                            value: value,
                            done: true
                        });
                        break;

                    case 'throw':
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

            if (typeof gen.return !== 'function') {
                this.return = undefined;
            }
        }

        if (typeof Symbol === 'function' && Symbol.asyncIterator) {
            AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
                return this;
            };
        }

        AsyncGenerator.prototype.next = function(arg) {
            return this._invoke('next', arg);
        };

        AsyncGenerator.prototype.throw = function(arg) {
            return this._invoke('throw', arg);
        };

        AsyncGenerator.prototype.return = function(arg) {
            return this._invoke('return', arg);
        };

        return {
            wrap: function(fn) {
                return function() {
                    return new AsyncGenerator(fn.apply(this, arguments));
                };
            },
            await: function(value) {
                return new AwaitValue(value);
            }
        };
    })();

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj)
            return obj;

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
        //query variables
        form_col: 'formoid',
        formDescription_col: 'ecrfpagename',
        field_col: 'fieldname',
        fieldDescription_col: 'fieldname', //there is not a dscriptive column in the test data prescribed by heather
        marking_group_col: 'markinggroup',
        visit_col: 'folderoid',

        //query open time settings
        open_col: 'open_time',
        open_category_col: 'Query Open Time Category',
        open_category_order: ['0-7 days', '8-14 days', '15-30 days', '>30 days'],

        //query age settings
        age_col: 'qdays',
        age_category_col: 'Query Age Category',
        age_category_order: null,
        age_category_colors: [
            '#fd8d3c',
            '#fc4e2a',
            '#e31a1c',
            '#bd0026',
            '#800026',
            '#1f78b4',
            'gray'
        ],

        //query status settings
        status_col: 'querystatus',
        status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
        status_colors: ['#fb9a99', '#fdbf6f', '#1f78b4', 'gray'],

        groups: null,
        status_groups: null,
        site_col: 'sitename',
        filters: null,
        details: null,
        dropdown_size: 6,
        cutoff: 10,
        alphabetize: true,
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
        marks: [
            {
                type: 'bar',
                per: [null], // set in syncSettings()
                split: null, // set in syncSettings()
                arrange: 'stacked',
                summarizeX: 'count',
                tooltip: null // set in syncSettings()
            }
        ],
        color_by: null, // set in syncSettings()
        color_dom: null, // set in syncSettings()
        legend: {
            location: 'top',
            //  label: 'Query Status',
            label: null,
            order: null // set in syncSettings()
        },
        range_band: 15,
        margin: {
            right: '50' // room for count annotation
        }
    };

    function arrayOfVariablesCheck(defaultVariables, userDefinedVariables) {
        var validSetting =
            userDefinedVariables instanceof Array && userDefinedVariables.length
                ? d3$1
                      .merge([
                          defaultVariables,
                          userDefinedVariables.filter(function(item) {
                              return (
                                  !(
                                      item instanceof Object &&
                                      item.hasOwnProperty('value_col') === false
                                  ) &&
                                  defaultVariables
                                      .map(function(d) {
                                          return d.value_col;
                                      })
                                      .indexOf(item.value_col || item) === -1
                              );
                          })
                      ])
                      .map(function(item) {
                          var itemObject = {};

                          itemObject.value_col = item instanceof Object ? item.value_col : item;
                          itemObject.label =
                              item instanceof Object
                                  ? item.label || itemObject.value_col
                                  : itemObject.value_col;

                          return itemObject;
                      })
                : defaultVariables;

        return validSetting;
    }

    function syncSettings(settings) {
        var syncedSettings = clone(settings);

        //groups
        var defaultGroups = [
            { value_col: syncedSettings.form_col, label: 'Form' },
            { value_col: 'Form: Field', label: 'Form: Field' },
            { value_col: syncedSettings.site_col, label: 'Site' },
            { value_col: syncedSettings.marking_group_col, label: 'Marking Group' },
            { value_col: syncedSettings.visit_col, label: 'Visit/Folder' }
        ];
        syncedSettings.groups = arrayOfVariablesCheck(defaultGroups, settings.groups);

        //status_groups
        var defaultStatusGroups = [
            {
                value_col: syncedSettings.age_category_col,
                label: 'Query Age Category',
                order: syncedSettings.age_category_order,
                colors: syncedSettings.age_category_colors
            },
            {
                value_col: syncedSettings.status_col,
                label: 'Query Status',
                order: syncedSettings.status_order,
                colors: syncedSettings.status_colors
            }
        ];
        syncedSettings.status_groups = arrayOfVariablesCheck(
            defaultStatusGroups,
            settings.status_groups
        );

        //y-axis
        syncedSettings.y.column = syncedSettings.form_col;

        //stratification
        syncedSettings.color_by = syncedSettings.status_groups[0].value_col;
        syncedSettings.color_dom = syncedSettings.status_groups[0].order
            ? syncedSettings.status_groups[0].order.slice()
            : null;
        syncedSettings.colors = syncedSettings.status_groups[0].colors;
        syncedSettings.legend.label = syncedSettings.status_groups[0].label;
        syncedSettings.legend.order = syncedSettings.status_groups[0].order
            ? syncedSettings.status_groups[0].order.slice()
            : null;

        //mark settings
        syncedSettings.marks[0].per[0] = syncedSettings.form_col;
        syncedSettings.marks[0].split = syncedSettings.color_by;
        syncedSettings.marks[0].tooltip = '[' + syncedSettings.color_by + '] - $x queries';

        //filters
        var defaultFilters = [
            { value_col: syncedSettings.form_col, label: 'Form', multiple: true },
            { value_col: syncedSettings.site_col, label: 'Site', multiple: true },
            { value_col: syncedSettings.marking_group_col, label: 'Marking Group', multiple: true },
            { value_col: syncedSettings.visit_col, label: 'Visit/Folder', multiple: true }
        ];

        // if open caterogy is defined then add filter and place it by the other query filters
        if (syncedSettings.open_category_col) {
            defaultFilters.unshift({
                value_col: syncedSettings.open_category_col,
                label: 'Query Open Time',
                multiple: true,
                order: syncedSettings.open_category_order
            });
        }

        syncedSettings.status_groups.reverse().forEach(function(status_group) {
            status_group.multiple = true;
            defaultFilters.unshift(clone(status_group));
        });
        syncedSettings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

        //cutoff
        if (!(+syncedSettings.cutoff > 0 || syncedSettings.cutoff === 'All'))
            syncedSettings.cutoff = 10;

        //details
        syncedSettings.details = arrayOfVariablesCheck([], settings.details);
        if (syncedSettings.details.length === 0) delete syncedSettings.details;
        return syncedSettings;
    }

    var controlInputs = [
        {
            type: 'dropdown',
            option: 'y.label',
            label: 'Group by',
            description: 'variable toggle',
            start: null, // set in syncControlInputs()
            values: null, // set in syncControlInputs()
            require: true
        },
        {
            type: 'dropdown',
            label: 'Status Group',
            description: 'stratification',
            options: ['marks.0.split', 'color_by'], // will want to change tooltip too
            start: null, // set in syncControlInputs()
            values: null, // set in syncControlInputs()
            require: true
        },
        {
            type: 'radio',
            option: 'marks.0.arrange',
            label: 'Bar Arrangement',
            values: ['stacked', 'grouped']
        },
        {
            type: 'radio',
            option: 'cutoff',
            label: 'Show First N Groups',
            values: ['10', '25', 'All']
        },
        {
            type: 'checkbox',
            option: 'alphabetize',
            label: 'Alphabetical?'
        }
    ];

    function syncControlInputs(controlInputs, settings) {
        var syncedControlInputs = clone(controlInputs);

        //Group by
        var groupByControl = syncedControlInputs.find(function(controlInput) {
            return controlInput.label === 'Group by';
        });
        groupByControl.values = settings.groups.map(function(group) {
            return group.label;
        });

        //Status Group
        var statusGroupControl = syncedControlInputs.find(function(controlInput) {
            return controlInput.label === 'Status Group';
        });
        statusGroupControl.values = settings.status_groups.map(function(status_group) {
            return status_group.value_col;
        });

        //filters
        settings.filters.forEach(function(filter, i) {
            filter.type = 'subsetter';
            filter.description = 'filter';
            syncedControlInputs.splice(2 + i, 0, filter);
        });

        //Show First N Groups
        var nGroupsControl = syncedControlInputs.find(function(controlInput) {
            return controlInput.label === 'Show First N Groups';
        });
        if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
            nGroupsControl.values.push(settings.cutoff.toString());
            nGroupsControl.values.sort(function(a, b) {
                return a === 'All' ? 1 : b === 'All' ? -1 : +a - +b;
            });
        } else settings.cutoff = settings.cutoff.toString() || nGroupsControl.values[0];

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

    function defineListingSettings() {
        this.listing.config.cols = this.config.details
            ? this.config.details.map(function(d) {
                  return d.value_col;
              })
            : Object.keys(this.raw_data[0]).filter(function(key) {
                  return key !== 'Form: Field';
              });
        this.listing.config.headers = this.config.details
            ? this.config.details.map(function(d) {
                  return d.label;
              })
            : Object.keys(this.raw_data[0]).filter(function(key) {
                  return key !== 'Form: Field';
              });
    }

    function defineNewVariables() {
        var _this = this;

        this.raw_data.forEach(function(d) {
            d['Form: Field'] = d[_this.config.form_col] + ': ' + d[_this.config.field_col];

            //Define query age category.
            if (!_this.config.age_category_order) {
                var queryAge =
                    /^ *\d+ *$/.test(d[_this.config.age_col]) &&
                    ['Closed', 'Cancelled'].indexOf(d[_this.config.status_col]) < 0
                        ? +d[_this.config.age_col]
                        : NaN;
                switch (true) {
                    case queryAge <= 14:
                        d['Query Age Category'] = '0-2 weeks';
                        break;
                    case queryAge <= 28:
                        d['Query Age Category'] = '2-4 weeks';
                        break;
                    case queryAge <= 56:
                        d['Query Age Category'] = '4-8 weeks';
                        break;
                    case queryAge <= 112:
                        d['Query Age Category'] = '8-16 weeks';
                        break;
                    case queryAge > 112:
                        d['Query Age Category'] = '>16 weeks';
                        break;
                    default:
                        d['Query Age Category'] = d[_this.config.status_col];
                        break;
                }
            }

            if (_this.config.open_col) {
                //Define query age category.
                var openTime = /^ *\d+ *$/.test(d[_this.config.open_col])
                    ? +d[_this.config.open_col]
                    : NaN;
                switch (true) {
                    case openTime <= 7:
                        d['Query Open Time Category'] = '0-7 days';
                        break;
                    case openTime <= 14:
                        d['Query Open Time Category'] = '8-14 days';
                        break;
                    case openTime <= 30:
                        d['Query Open Time Category'] = '15-30 days';
                        break;
                    default:
                        d['Query Open Time Category'] = '>30 days';
                        break;
                }
            }
        });
    }

    function defineQueryStatuses() {
        var _this = this;

        var queryStatusInput = this.controls.config.inputs.find(function(input) {
            return input.value_col === _this.config.status_col;
        });
        var queryStatusGroup = this.config.status_groups.find(function(status_group) {
            return status_group.value_col === _this.config.status_col;
        });
        var queryStatusOrder = Array.isArray(queryStatusGroup.order)
            ? queryStatusGroup.order.concat(
                  d3
                      .set(
                          this.raw_data.map(function(d) {
                              return d[_this.config.status_col];
                          })
                      )
                      .values()
                      .filter(function(value) {
                          return queryStatusGroup.order.indexOf(value) < 0;
                      })
                      .sort()
              )
            : d3
                  .set(
                      this.raw_data.map(function(d) {
                          return d[_this.config.status_col];
                      })
                  )
                  .values()
                  .sort();
        queryStatusInput.order = queryStatusOrder;
        queryStatusGroup.order = queryStatusOrder;
    }

    function defineQueryAgeCategories() {
        var _this = this;

        var queryAgeCategoryInput = this.controls.config.inputs.find(function(input) {
            return input.value_col === _this.config.age_category_col;
        });
        var queryAgeCategoryGroup = this.config.status_groups.find(function(age_category_group) {
            return age_category_group.value_col === _this.config.age_category_col;
        });
        var queryStatusOrder = this.config.status_groups.find(function(status_group) {
            return status_group.value_col === _this.config.status_col;
        }).order;
        var queryAgeCategoryOrder = Array.isArray(queryAgeCategoryGroup.order)
            ? queryAgeCategoryGroup.order.concat(
                  d3
                      .set(
                          this.raw_data.map(function(d) {
                              return d[_this.config.age_category_col];
                          })
                      )
                      .values()
                      .filter(function(value) {
                          return queryAgeCategoryGroup.order.indexOf(value) < 0;
                      })
                      .sort()
              )
            : d3
                  .set(
                      this.raw_data.map(function(d) {
                          return d[_this.config.age_category_col];
                      })
                  )
                  .values()
                  .sort(function(a, b) {
                      var aIndex = queryStatusOrder.indexOf(a);
                      var bIndex = queryStatusOrder.indexOf(b);
                      var diff = aIndex - bIndex;

                      return diff ? diff : a < b ? -1 : 1;
                  });
        queryAgeCategoryInput.order = queryAgeCategoryOrder;
        queryAgeCategoryGroup.order = queryAgeCategoryOrder;
    }

    function onInit() {
        //Define new variables.
        defineNewVariables.call(this);

        //Define query statuses.
        defineQueryStatuses.call(this);

        //Define query age categories.
        defineQueryAgeCategories.call(this);

        //Define detail listing settings.
        defineListingSettings.call(this);

        //Initialize listing.
        this.listing.init(this.raw_data);
    }

    function updateGroupByOptions() {
        var context = this;

        var groupByControl = this.controls.wrap
            .selectAll('.control-group select')
            .filter(function(d) {
                return d.label === 'Group by';
            })
            .on('change', function() {
                //Update y-axis label.
                var label = d3
                    .select(this)
                    .selectAll('option:checked')
                    .text();
                context.config.y.label = label;

                //Update y-axis variable.
                var value_col = context.config.groups.find(function(group) {
                    return group.label === label;
                }).value_col;
                context.config.y.column = value_col;

                context.config.marks[0].per = [value_col];
                context.draw();
            });
    }

    function customizeMultiSelects() {
        var context = this;

        this.controls.wrap
            .selectAll('.control-group select')
            .filter(function() {
                return this.multiple;
            })
            .attr(
                'title',
                'Hold the CTRL key while clicking to select or deselect a single option.'
            )
            .property('size', function() {
                return Math.min(
                    context.config.dropdown_size,
                    this.querySelectorAll('option').length
                );
            })
            .style('overflow-y', function() {
                return this.size < this.querySelectorAll('option').length ? 'scroll' : 'hidden';
            })
            .each(function(d) {
                var filter = context.filters.find(function(filter) {
                    return filter.col === d.value_col;
                });
                d3
                    .select(this)
                    .selectAll('option')
                    .sort(function(a, b) {
                        return d.order ? d.order.indexOf(a) - d.order.indexOf(b) : a < b ? -1 : 1;
                    });
            });
    }

    function setYAxisDomainLength() {
        var context = this;

        var groupToggles = this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.label == 'Show first N groups';
            })
            .selectAll('input[type="radio"]');
        groupToggles.property('checked', function(d, i) {
            return d == context.config.cutoff;
        });
        this.config.cutoff =
            this.config.cutoff === 'All' ? this.raw_data.length : +this.config.cutoff;
        groupToggles.on('change', function() {
            var value = groupToggles
                .filter(function(f) {
                    return d3.select(this).property('checked');
                })
                .property('value');
            context.config.cutoff = value == 'All' ? context.raw_data.length : +value;
            context.draw();
        });
    }

    function addResetButton() {
        var _this = this;

        this.controls.wrap
            .insert('button', ':first-child')
            .attr('id', 'reset-chart')
            .style({
                margin: '5px',
                padding: '5px',
                float: 'right'
            })
            .text('Reset chart')
            .on('click', function() {
                var element = clone(_this.div),
                    settings = clone(_this.initialSettings),
                    data = clone(_this.raw_data);
                _this.listing.destroy();
                _this.destroy();
                queryOverview(element, settings).init(data);
            });
    }

    function clearListingOnChange() {
        var context = this;

        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(control) {
                return ['dropdown', 'subsetter'].indexOf(control.type) > -1;
            })
            .on('change', function(d) {
                //Clear bar highlighting.
                context.svg
                    .selectAll('.bar')
                    .classed('selected', false)
                    .style({
                        'stroke-width': '1px',
                        fill: function fill(d) {
                            return context.colorScale(d.key);
                        }
                    });

                //Reset listing.
                context.listing.wrap.selectAll('*').remove();
                context.wrap.select('#listing-instruction').style('display', 'block');
                context.listing.init(context.filtered_data);
            });
    }

    function addListingInstruction() {
        this.wrap
            .append('em')
            .attr('id', 'listing-instruction')
            .text('Click a bar to view its underlying data.');
    }

    function onLayout() {
        //Display group label rather than group column name in Group by control.
        updateGroupByOptions.call(this);

        //Customize dropdowns with multiple options.
        customizeMultiSelects.call(this);

        //Handle y-domain length control
        setYAxisDomainLength.call(this);

        //Add reset button.
        addResetButton.call(this);

        //Clear listing when controls change.
        clearListingOnChange.call(this);

        //Add listing instruction.
        addListingInstruction.call(this);
    }

    function updateStratification() {
        var _this = this;

        var stratification = this.config.status_groups.find(function(status_group) {
            return status_group.value_col === _this.config.color_by;
        });
        this.config.color_dom =
            stratification.order ||
            d3$1
                .set(
                    this.raw_data.map(function(d) {
                        return d[_this.config.color_by];
                    })
                )
                .values()
                .sort();
        this.config.colors = stratification.colors;
        this.config.legend.label = stratification.label;
        this.config.legend.order = this.config.color_dom.slice();
        this.config.marks[0].tooltip = '[' + this.config.color_by + '] - $x queries';
    }

    function highlightSelectedOptions() {
        var context = this;

        this.controls.wrap
            .selectAll('.control-group select')
            .filter(function() {
                return this.multiple;
            })
            .each(function(d) {
                var filter = context.filters.find(function(filter) {
                    return filter.col === d.value_col;
                });
                d3
                    .select(this)
                    .selectAll('option')
                    .property('selected', function(di) {
                        return filter.val === 'All' || filter.val.indexOf(di) > -1;
                    });
            });
    }

    function updateRangeBand() {
        if (this.config.marks[0].arrange === 'stacked') {
            this.config.range_band = 15;
        } else {
            this.config.range_band = 15 * this.config.color_dom.length;
        }
    }

    function onPreprocess() {
        highlightSelectedOptions.call(this);
        updateStratification.call(this);
        updateRangeBand.call(this);
    }

    function onDataTransform() {}

    function setLeftMargin() {
        var fontSize = parseInt(this.wrap.style('font-size'));
        this.config.margin.left =
            Math.max(
                7,
                d3.max(this.y_dom, function(d) {
                    return d.length;
                })
            ) *
                fontSize *
                0.5 +
            fontSize * 1.5 * 1.5 +
            6;
    }

    function setYDomain() {
        var _this = this;

        //Sort summarized data by descending total.
        this.current_data.sort(function(a, b) {
            return b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
        });

        //Sort y-domain by descending total.
        this.y_dom.sort(function(a, b) {
            var order = _this.current_data.map(function(d) {
                return d.key;
            });
            return order.indexOf(b) < order.indexOf(a)
                ? -1
                : order.indexOf(b) > order.indexOf(a)
                    ? 1
                    : order.indexOf(b) >= order.indexOf(a) ? 0 : NaN;
        });

        //Limit y-domain to key values in summarized data.
        this.y_dom = this.y_dom.filter(function(d) {
            return (
                _this.current_data
                    .map(function(di) {
                        return di.key;
                    })
                    .indexOf(d) > -1
            );
        });

        //Sort y-domain alphanumerically or descending total.
        this.y_dom = this.config.alphabetize ? this.y_dom.sort(d3.descending) : this.y_dom;

        //Limit y-domain to first [chart.config.cutoff] values.
        if (this.config.cutoff !== 'All') {
            this.y_dom_length = this.y_dom.length;
            this.y_dom = this.y_dom.filter(function(d, i) {
                return i >= _this.y_dom.length - _this.config.cutoff;
            });
        } else {
            this.y_dom_length = this.y_dom.length; // ensure that "X more items" does not appear on Show All
        }
    }

    function setChartHeight() {
        //Match chart height to number of bars currently displayed.
        this.raw_height =
            (+this.config.range_band + this.config.range_band * this.config.padding) *
            this.y_dom.length;
    }

    function onDraw() {
        setLeftMargin.call(this);
        setYDomain.call(this);
        setChartHeight.call(this);
    }

    function legendFilter() {
        var _this = this;

        var context = this;

        //Filter data by clicking on legend.
        var statusFilter = this.filters.find(function(filter) {
            return filter.col === _this.config.color_by;
        });
        var legendItems = this.wrap
            .selectAll('.legend-item')
            .style({
                cursor: 'pointer',
                'border-radius': '4px',
                padding: '5px',
                'padding-left': '8px'
            })
            .classed('selected', function(d) {
                return statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1;
            })
            .style('background', function(d) {
                return statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1
                    ? 'lightgray'
                    : 'white';
            });
        var statusOptions = this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.value_col === context.config.marks[0].split;
            })
            .selectAll('.changer option'); // status filter options
        legendItems.selectAll('.legend-mark-text').remove(); // don't need 'em
        legendItems.on('click', function(d) {
            var legendItem = d3.select(this),
                // clicked legend item
                selected = !legendItem.classed('selected'); // selected boolean
            legendItem.classed('selected', selected); // toggle selected class
            var selectedLegendItems = legendItems
                .filter(function() {
                    return d3.select(this).classed('selected');
                })
                .data()
                .map(function(d) {
                    return d.label;
                }); // selected statuses
            legendItem.style({
                background: selected ? 'lightgray' : 'white'
            }); // set background of legend items corresponding to selected statuses to light gray
            statusOptions
                .property('selected', false)
                .filter(function(d) {
                    return selectedLegendItems.indexOf(d) > -1;
                })
                .property('selected', true); // set selected property of status options corresponding to selected statuses to true
            var filtered_data = context.raw_data.filter(function(d) {
                var filtered = selectedLegendItems.indexOf(d[context.config.marks[0].split]) === -1;

                context.filters
                    .filter(function(filter) {
                        return filter.col !== context.config.marks[0].split;
                    })
                    .forEach(function(filter) {
                        if (filtered === false && filter.val !== 'All')
                            filtered =
                                typeof filter.val === 'string'
                                    ? d[filter.col] !== filter.val
                                    : filter.val.indexOf(d[filter.col]) === -1;
                    });

                return !filtered;
            }); // define filtered data

            context.filters.filter(function(filter) {
                return filter.col === context.config.marks[0].split;
            })[0].val = selectedLegendItems;

            //Clear bar highlighting.
            context.svg
                .selectAll('.bar')
                .classed('selected', false)
                .style({
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

    function addYAxisTickTooltips() {
        var _this = this;

        if (this.config.y.column === this.config.form_col)
            this.svg
                .selectAll('.y.axis .tick')
                .filter(function(form) {
                    return _this.y_dom.indexOf(form) > -1;
                })
                .append('title')
                .text(function(form) {
                    return (
                        'Form: ' +
                        (_this.raw_data.filter(function(d) {
                            return d[_this.config.form_col] === form;
                        })[0][_this.config.formDescription_col] || form)
                    );
                });
        if (this.config.y.column === 'Form: Field')
            this.svg
                .selectAll('.y.axis .tick')
                .style('cursor', 'help')
                .filter(function(field) {
                    return _this.y_dom.indexOf(field) > -1;
                })
                .append('title')
                .text(function(field) {
                    var datum = _this.raw_data.filter(function(d) {
                        return d['Form: Field'] === field;
                    })[0];
                    return (
                        'Form: ' +
                        (datum[_this.config.formDescription_col] || datum[_this.config.form_col]) +
                        '\nField: ' +
                        (datum[_this.config.fieldDescription_col] || datum[_this.config.field_col])
                    );
                });
    }

    function addYAxisTickClick() {
        var _this = this;

        if (this.config.y.column === this.config.form_col) {
            var yLabels = this.svg
                .selectAll('.y.axis .tick')
                .style('fill', 'blue')
                .style('text-decoration', 'underline');
            yLabels.style('cursor', 'pointer').on('click', function(yLabel) {
                _this.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(d) {
                        return d.label === 'Group by';
                    })
                    .selectAll('option')
                    .property('selected', function(d) {
                        return d === 'Form: Field';
                    });
                _this.config.y.column = 'Form: Field';
                _this.config.y.label = 'Form: Field';
                _this.config.marks[0].per[0] = 'Form: Field';
                _this.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(d) {
                        return d.label === 'Form';
                    })
                    .selectAll('option')
                    .property('selected', function(d) {
                        return d === yLabel;
                    });
                _this.filters.filter(function(filter) {
                    return filter.col === _this.config.form_col;
                })[0].val = yLabel;

                _this.draw(
                    _this.filtered_data.filter(function(d) {
                        return d[_this.config.form_col] === yLabel;
                    })
                );
                _this.listing.wrap.selectAll('*').remove();
                _this.wrap.select('listing-instruction').style('display', 'block');
                _this.listing.init(_this.filtered_data);
            });
        }
    }

    function annotateYAxisInfo() {
        var _this = this;

        this.svg.select('#y-axis-info').remove();

        if (this.y_dom.length < this.y_dom_length) {
            this.svg
                .append('text')
                .attr({
                    id: 'y-axis-info',
                    x: 0,
                    dx: -10,
                    y: this.plot_height,
                    dy: 15,
                    'text-anchor': 'end'
                })
                .style('cursor', 'help')
                .text('and ' + (this.y_dom_length - this.y_dom.length) + ' more')
                .on('mouseover', function() {
                    _this.controls.wrap
                        .selectAll('.control-group')
                        .filter(function(d) {
                            return d.option === 'cutoff';
                        })
                        .style('background', 'lightgray');
                })
                .on('mouseout', function() {
                    _this.controls.wrap
                        .selectAll('.control-group')
                        .filter(function(d) {
                            return d.option === 'cutoff';
                        })
                        .style('background', null);
                })
                .append('title')
                .text(
                    'The number of ' +
                        this.config.y.label.toLowerCase() +
                        's can be changed with the Show First N Groups radio buttons.'
                );
        }
    }

    function hideBars() {
        var _this = this;

        this.svg
            .select('g.bar-supergroup')
            .selectAll('g.bar-group')
            .attr('display', function(d) {
                return _this.y_dom.indexOf(d.key) > -1 ? null : 'none';
            });
    }

    function annotateNumberOfQueries() {
        var context = this;

        this.svg.selectAll('.number-of-queries').remove();
        if (this.config.marks[0].arrange === 'stacked') {
            this.current_data.forEach(function(d) {
                if (context.y_dom.indexOf(d.key) > -1) {
                    context.svg
                        .append('text')
                        .classed('number-of-queries', true)
                        .attr({
                            x: context.x(d.total),
                            y: context.y(d.key) + context.y.rangeBand() / 2,
                            dx: '0.25em',
                            dy: '0.3em'
                        })
                        .style('font-size', '80%')
                        .text(d.total);
                }
            });
        } else {
            this.current_data.forEach(function(d) {
                if (context.y_dom.indexOf(d.key) > -1) {
                    d.values.forEach(function(di) {
                        context.svg
                            .append('text')
                            .classed('number-of-queries', true)
                            .attr({
                                x: context.x(di.values.x),
                                y:
                                    context.y(d.key) +
                                    context.y.rangeBand() *
                                        (context.config.color_dom.length -
                                            1 -
                                            context.config.color_dom.indexOf(di.key)) /
                                        context.config.color_dom.length,
                                dx: '0.25em',
                                dy: '1em'
                            })
                            .style('font-size', '80%')
                            .text(di.values.x);
                    });
                }
            });
        }
    }

    // from https://gist.github.com/samgiles/762ee337dff48623e729

    Array.prototype.flatMap = function(lambda) {
        return Array.prototype.concat.apply([], this.map(lambda));
    };

    function addBarClick() {
        var context = this;

        var barGroups = this.svg.selectAll('.bar-group');
        var bars = this.svg.selectAll('.bar');
        // will subtract and add to bar to offset increase in stroke-width and prevent bars
        // from overlapping as much when neighbors are both selected.
        var mouseoverAttrib = {
            width: function width(d) {
                return this.getBBox().width - 2.5;
            },
            x: function x(d) {
                return this.getBBox().x + 2.5;
            }
        };
        var mouseoverStyle = {
            'stroke-width': '5px',
            fill: 'black'
        };
        var mouseoutAttrib = {
            width: function width(d) {
                return this.getBBox().width + 2.5;
            },
            x: function x(d) {
                return this.getBBox().x - 2.5;
            }
        };
        var mouseoutStyle = {
            'stroke-width': '1px',
            fill: function fill(d) {
                return context.colorScale(d.key);
            }
        };
        bars
            .style('cursor', 'pointer')
            .on('mouseover', function() {
                if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoverStyle);
                if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoverAttrib);
                //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
                if (!/trident/i.test(navigator.userAgent)) d3.select(this).moveToFront();
            })
            .on('mouseout', function() {
                if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoutStyle);
                if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoutAttrib);
                bars
                    .filter(function() {
                        return d3.select(this).classed('selected');
                    })
                    .moveToFront();
            })
            .on('click', function(d) {
                // this doesn't need a style because mouseout isn't applied when the bar is selected
                d3
                    .select(this)
                    .classed('selected', d3.select(this).classed('selected') ? false : true);
                context.listing.wrap.selectAll('*').remove();
                // feed listing data for all selected bars
                context.listing.init(
                    d3
                        .selectAll('rect.selected')
                        .data()
                        .flatMap(function(d) {
                            return d.values.raw;
                        })
                );
                context.wrap.select('#listing-instruction').style('display', 'none'); // remove bar instructions
                // display filtered data if no bars are selected
                if (d3.selectAll('rect.selected')[0].length === 0) {
                    context.listing.wrap.selectAll('*').remove();
                    context.wrap.select('#listing-instruction').style('display', 'block');
                    context.listing.init(context.filtered_data);
                }
            });
    }

    function onResize() {
        //Add filter functionality to legend.
        legendFilter.call(this);

        //Add y-tick-label tooltips.
        addYAxisTickTooltips.call(this);

        //Plot data by field when viewing data by form and user clicks y-axis tick label.
        addYAxisTickClick.call(this);

        //Annotate the number of hidden y-axis tick labels.
        annotateYAxisInfo.call(this);

        //Hide bars that aren't in first N groups.
        hideBars.call(this);

        //Annotate number of queries.
        annotateNumberOfQueries.call(this);

        //Add bar click-ability.
        addBarClick.call(this);
    }

    function onInit$1() {}

    function resetListing() {
        var _this = this;

        this.wrap
            .insert('button', ':first-child')
            .attr('id', 'clear-listing')
            .style({
                margin: '5px',
                padding: '5px',
                float: 'left',
                display: 'block'
            })
            .text('Reset listing')
            .on('click', function() {
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
                _this.chart.svg
                    .selectAll('.bar')
                    .classed('selected', false)
                    .style({
                        'stroke-width': '1px',
                        fill: function fill(d) {
                            return _this.chart.colorScale(d.key);
                        }
                    });
                _this.chart.listing.init(_this.chart.filtered_data);
                _this.chart.wrap.select('#listing-instruction').style('display', 'block');
            });
    }

    function onLayout$1() {
        resetListing.call(this);
        this.wrap.select('.sortable-container').classed('hidden', false);
        this.table.style('width', '100%').style('display', 'table');
    }

    function manualSort() {
        var _this = this;

        this.data.manually_sorted = this.data.raw.sort(function(a, b) {
            var order = 0;

            _this.sortable.order.forEach(function(item) {
                var aCell = a[item.col];
                var bCell = b[item.col];
                if (item.col !== 'Query Age') {
                    if (order === 0) {
                        if (
                            (item.direction === 'ascending' && aCell < bCell) ||
                            (item.direction === 'descending' && aCell > bCell)
                        )
                            order = -1;
                        else if (
                            (item.direction === 'ascending' && aCell > bCell) ||
                            (item.direction === 'descending' && aCell < bCell)
                        )
                            order = 1;
                    }
                } else {
                    if (order === 0) {
                        if (
                            (item.direction === 'ascending' && +aCell < +bCell) ||
                            (item.direction === 'descending' && +aCell > +bCell)
                        )
                            order = -1;
                        else if (
                            (item.direction === 'ascending' && +aCell > +bCell) ||
                            (item.direction === 'descending' && +aCell < +bCell)
                        )
                            order = 1;
                    }
                }
            });

            return order;
        });
        this.draw(this.data.manually_sorted);
    }

    function onClick() {
        var context = this;

        this.thead_cells.on('click', function(d) {
            var th = this;
            var header = d;
            var selection = d3.select(th);
            var col = context.config.cols[context.config.headers.indexOf(header)];

            //Check if column is already a part of current sort order.
            var sortItem = context.sortable.order.filter(function(item) {
                return item.col === col;
            })[0];

            //If it isn't, add it to sort order.
            if (!sortItem) {
                sortItem = {
                    col: col,
                    direction: 'ascending',
                    wrap: context.sortable.wrap
                        .append('div')
                        .datum({ key: col })
                        .classed('wc-button sort-box', true)
                        .text(header)
                };
                sortItem.wrap
                    .append('span')
                    .classed('sort-direction', true)
                    .html('&darr;');
                sortItem.wrap
                    .append('span')
                    .classed('remove-sort', true)
                    .html('&#10060;');
                context.sortable.order.push(sortItem);
            } else {
                //Otherwise reverse its sort direction.
                sortItem.direction =
                    sortItem.direction === 'ascending' ? 'descending' : 'ascending';
                sortItem.wrap
                    .select('span.sort-direction')
                    .html(sortItem.direction === 'ascending' ? '&darr;' : '&uarr;');
            }

            //Hide sort instructions.
            context.sortable.wrap.select('.instruction').classed('hidden', true);

            //Add sort container deletion functionality.
            context.sortable.order.forEach(function(item, i) {
                item.wrap.on('click', function(d) {
                    //Remove column's sort container.
                    d3.select(this).remove();

                    //Remove column from sort.
                    context.sortable.order.splice(
                        context.sortable.order
                            .map(function(d) {
                                return d.col;
                            })
                            .indexOf(d.key),
                        1
                    );

                    //Display sorting instruction.
                    context.sortable.wrap
                        .select('.instruction')
                        .classed('hidden', context.sortable.order.length);

                    //Redraw chart.
                    manualSort.call(context);
                });
            });

            //Redraw chart.
            manualSort.call(context);
        });
    }

    function onDraw$1() {
        onClick.call(this);
    }

    function onDestroy$1() {}

    function queryOverview$1(element, settings) {
        var mergedSettings = Object.assign({}, configuration.settings, settings);
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var syncedControlInputs = configuration.syncControlInputs(
            configuration.controlInputs,
            syncedSettings
        );
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);
        var listing = webcharts.createTable(element, {
            sortable: false,
            exportable: syncedSettings.exportable
        });

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
});
