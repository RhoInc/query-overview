(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
        ? define(['d3', 'webcharts'], factory)
        : ((global = global || self),
          (global.queryOverview = factory(global.d3, global.webCharts)));
})(this, function(d3, webcharts) {
    'use strict';

    var d3__default = 'default' in d3 ? d3['default'] : d3;

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, 'length')).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return undefined.

                return undefined;
            }
        });
    }

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
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

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return -1.

                return -1;
            }
        });
    }

    Array.prototype.flatMap = function(lambda) {
        return Array.prototype.concat.apply([], this.map(lambda));
    };

    d3__default.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) this.parentNode.insertBefore(this, firstChild);
        });
    };

    d3__default.selection.prototype.moveToFront = function() {
        return this.each(function() {
            this.parentNode.appendChild(this);
        });
    };

    if (typeof Element !== 'undefined' && Element)
        Element.prototype.remove = function() {
            this.parentElement.removeChild(this);
        };
    if (typeof NodeList !== 'undefined' && NodeList)
        NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
            for (var i = this.length - 1; i >= 0; i--) {
                if (this[i] && this[i].parentElement) {
                    this[i].parentElement.removeChild(this[i]);
                }
            }
        };

    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function clone(obj) {
        var copy; //boolean, number, string, null, undefined

        if ('object' != _typeof(obj) || null == obj) return obj; //date

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } //array

        if (obj instanceof Array) {
            copy = [];

            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }

            return copy;
        } //object

        if (obj instanceof Object) {
            copy = {};

            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }

            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function rendererSettings() {
        return {
            //query variables
            site_col: 'sitename',
            id_col: 'subjectnameoridentifier',
            visit_col: 'folderoid',
            visitDescription_col: 'folderinstancename',
            form_col: 'formoid',
            formDescription_col: 'ecrfpagename',
            field_col: 'fieldname',
            fieldDescription_col: 'fieldlabel',
            marking_group_col: 'markinggroup',
            open_by_col: 'queryopenby',
            query_col: 'querytext',
            query_response_col: 'queryresponsetext',
            //query status
            status_col: 'querystatus',
            status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
            status_colors: ['#fd8d3c', '#4daf4a', '#377eb8', '#999999'],
            //query recency
            open_date_col: 'queryopendate',
            response_date_col: 'queryresponsedate',
            resolved_date_col: 'queryresolveddate',
            recency_col: 'odays',
            recency_cutoffs: [7, 14, 30],
            recency_category_col: 'open_time',
            //query age
            age_statuses: ['Open'],
            age_col: 'qdays',
            age_cutoffs: [14, 28, 56, 112],
            age_range_colors: [
                '#ffffcc',
                '#ffeda0',
                '#fed976',
                '#feb24c',
                '#fd8d3c',
                '#fc4e2a',
                '#e31a1c',
                '#bd0026',
                '#800026'
            ],
            //miscellany
            color_by_col: 'queryage',
            // options: [ 'queryage' , 'querystatus' ] or any of status_groups[].value_col
            groups: null,
            status_groups: null,
            filters: null,
            dropdown_size: 6,
            details: null,
            bar_arrangement: 'stacked',
            cutoff: 'All',
            alphabetize: true,
            truncate_listing_cells: true,
            truncation_cutoff: 100
        };
    }

    function chartSettings() {
        return {
            x: {
                label: '# of Queries',
                column: null,
                behavior: 'flex'
            },
            y: {
                type: 'ordinal',
                column: null,
                // set in ./syncSettings
                label: 'Form',
                sort: null // set in ./syncSettings
            },
            marks: [
                {
                    type: 'bar',
                    per: [null],
                    // set in ./syncSettings
                    split: null,
                    // set in ./syncSettings
                    arrange: null,
                    // set in ./syncSettings
                    summarizeX: 'count',
                    tooltip: null // set in ./syncSettings
                }
            ],
            color_by: null,
            // set in ./syncSettings
            color_dom: null,
            // set in ./syncSettings
            legend: {
                location: 'top',
                label: null,
                // set in ./syncSettings
                order: null // set in ./syncSettings
            },
            margin: {
                left: null,
                // set in ../chart/onDraw/setLeftMargin
                right: 50 // room for count annotation
            },
            range_band: 20,
            padding: 0.2,
            scale_text: false
        };
    }

    function listingSettings() {
        return {
            searchable: true,
            sortable: true,
            pagination: true,
            exportable: true,
            nRowsPerPage: 10
        };
    }

    function arrayOfVariablesCheck(defaultVariables, userDefinedVariables) {
        var validSetting =
            userDefinedVariables instanceof Array && userDefinedVariables.length
                ? d3
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
                          var itemObject = item instanceof Object ? Object.assign({}, item) : {};
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

    function syncGroups(settings) {
        var defaultGroups = [
            {
                value_col: settings.form_col,
                label: 'Form'
            },
            {
                value_col: 'Form: Field',
                label: 'Form: Field'
            },
            {
                value_col: settings.site_col,
                label: 'Site'
            },
            {
                value_col: settings.marking_group_col,
                label: 'Marking Group'
            },
            {
                value_col: settings.visit_col,
                label: 'Visit/Folder'
            }
        ];
        settings.groups = settings.arrayOfVariablesCheck(defaultGroups, settings.groups);
    }

    function syncStatusGroups(settings) {
        //age ranges
        settings.ageRanges = settings.age_cutoffs.map(function(d, i) {
            return i > 0 ? [settings.age_cutoffs[i - 1], d] : [0, d];
        });
        settings.ageRanges.push([settings.age_cutoffs[settings.age_cutoffs.length - 1], null]); //age range categories

        settings.ageRangeCategories = settings.age_cutoffs.every(function(age_range) {
            return age_range % 7 === 0;
        })
            ? settings.ageRanges.map(function(ageRange, i) {
                  return i < settings.ageRanges.length - 1
                      ? ''.concat(
                            ageRange
                                .map(function(days) {
                                    return days / 7;
                                })
                                .join('-'),
                            ' wks'
                        )
                      : '>'.concat(ageRange[0] / 7, ' wks');
              })
            : settings.ageRanges.map(function(ageRange, i) {
                  return i < settings.ageRanges.length - 1
                      ? ''.concat(ageRange.join('-'), ' days')
                      : '>'.concat(ageRange[0], ' days');
              }); //age range colors

        var ageRangeColors = settings.age_range_colors.slice(
            settings.age_range_colors.length - settings.ageRanges.length
        );
        settings.status_order.forEach(function(status, i) {
            if (settings.age_statuses.indexOf(status) < 0)
                ageRangeColors.push(settings.status_colors[i]);
        }); //reconcile settings.status_order with settings.status_colors to ensure equal length

        if (settings.status_order.length !== settings.status_colors.length) {
            console.warn('The number of query statuses does not match the number of query colors:');
            console.log(settings.status_order);
            console.log(settings.status_colors);
        } //default status groups

        var defaultStatusGroups = [
            {
                value_col: 'queryage',
                // derived in ../chart/onInit/defineNewVariables
                label: 'Query Age',
                order: settings.ageRangeCategories.concat(
                    settings.status_order.filter(function(status) {
                        return settings.age_statuses.indexOf(status) < 0;
                    })
                ),
                colors: ageRangeColors
            },
            {
                value_col: settings.status_col,
                label: 'Query Status',
                order: settings.status_order,
                colors: settings.status_colors
            }
        ]; //add custom status groups

        settings.status_groups = settings.arrayOfVariablesCheck(
            defaultStatusGroups,
            settings.status_groups
        );
        settings.status_group = settings.status_groups.find(function(status_group) {
            return status_group.value_col === settings.color_by_col;
        });
    }

    function syncWebchartsSettings(settings) {
        //y-axis
        settings.y.column = settings.form_col;
        settings.y.sort = settings.alphabetize ? 'alphabetical-ascending' : 'total-descending';
        settings.y.range_band = settings.range_band || 25; //mark settings

        settings.marks[0].per[0] = settings.form_col;
        settings.marks[0].split = settings.status_group.value_col;
        settings.marks[0].arrange = settings.bar_arrangement;
        settings.marks[0].tooltip = '['.concat(settings.status_group.value_col, '] - $x queries'); //stratification

        settings.color_by = settings.status_group.value_col;
        settings.color_dom = settings.status_group.order
            ? settings.status_group.order.slice()
            : null;
        settings.colors = settings.status_group.colors; //legend

        settings.legend.label = settings.status_group.label;
        settings.legend.order = settings.status_group.order
            ? settings.status_group.order.slice()
            : null;
    }

    function syncFilters(settings) {
        //recency ranges
        settings.recencyRanges = settings.recency_cutoffs.map(function(d, i) {
            return i > 0 ? [settings.recency_cutoffs[i - 1], d] : [0, d];
        });
        settings.recencyRanges.push([
            settings.recency_cutoffs[settings.recency_cutoffs.length - 1],
            null
        ]); //recency range categories

        settings.recencyRangeCategories = settings.recency_cutoffs.every(function(recency_range) {
            return recency_range % 7 === 0;
        })
            ? settings.recencyRanges.map(function(recencyRange, i) {
                  return i < settings.recencyRanges.length - 1
                      ? ''.concat(
                            recencyRange
                                .map(function(days) {
                                    return days / 7;
                                })
                                .join('-'),
                            ' weeks'
                        )
                      : '>'.concat(recencyRange[0] / 7, ' weeks');
              })
            : settings.recencyRanges.map(function(recencyRange, i) {
                  return i < settings.recencyRanges.length - 1
                      ? ''.concat(recencyRange.join('-'), ' days')
                      : '>'.concat(recencyRange[0], ' days');
              }); //default filters

        var defaultFilters = [
            {
                value_col: 'queryrecency',
                label: 'Query Recency',
                multiple: true
            },
            {
                value_col: settings.form_col,
                label: 'Form',
                multiple: true
            },
            {
                value_col: settings.site_col,
                label: 'Site',
                multiple: true
            },
            {
                value_col: settings.marking_group_col,
                label: 'Marking Group',
                multiple: true
            },
            {
                value_col: settings.visit_col,
                label: 'Visit/Folder',
                multiple: true
            }
        ]; //add status group variables to list of filters

        settings.status_groups
            .slice()
            .reverse()
            .forEach(function(status_group) {
                status_group.multiple = true;
                defaultFilters.unshift(settings.clone(status_group));
            }); //add custom filters

        settings.filters = settings.arrayOfVariablesCheck(defaultFilters, settings.filters);
    }

    function syncCutoff(settings) {
        if (!(+settings.cutoff > 0 || settings.cutoff === 'All')) settings.cutoff = 10;
    }

    function syncSettings(settings) {
        var syncedSettings = Object.assign({}, clone(settings), {
            clone: clone,
            arrayOfVariablesCheck: arrayOfVariablesCheck
        });
        syncGroups(syncedSettings);
        syncStatusGroups(syncedSettings);
        syncWebchartsSettings(syncedSettings);
        syncFilters(syncedSettings);
        syncCutoff(syncedSettings);
        syncCutoff(syncedSettings);
        return syncedSettings;
    }

    var controlInputs = [
        {
            type: 'dropdown',
            option: 'y.label',
            label: 'Group by',
            start: null,
            // set in syncControlInputs()
            values: null,
            // set in syncControlInputs()
            require: true
        },
        {
            type: 'radio',
            label: 'Status Group',
            option: 'color_by_col',
            start: null,
            // set in syncControlInputs()
            values: null,
            // set in syncControlInputs()
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
            label: 'Order Groups Alphabetically?'
        }
    ];

    function syncGroupBy(controlInputs, settings) {
        var groupByControl = controlInputs.find(function(controlInput) {
            return controlInput.label === 'Group by';
        });
        groupByControl.values = settings.groups.map(function(group) {
            return group.label;
        });
    }

    function syncStatusGroup(controlInputs, settings) {
        var statusGroupControl = controlInputs.find(function(controlInput) {
            return controlInput.label === 'Status Group';
        });
        statusGroupControl.start = settings.color_by;
        statusGroupControl.values = settings.status_groups.map(function(status_group) {
            return status_group.label;
        });
    }

    function syncFilters$1(controlInputs, settings) {
        settings.filters.forEach(function(filter, i) {
            filter.type = 'subsetter';
            controlInputs.splice(2 + i, 0, filter);
        });
    }

    function syncShowFirstNGroups(controlInputs, settings) {
        var nGroupsControl = controlInputs.find(function(controlInput) {
            return controlInput.label === 'Show First N Groups';
        });

        if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
            settings.cutoff = settings.cutoff.toString();
            nGroupsControl.values.push(settings.cutoff.toString());
            nGroupsControl.values.sort(function(a, b) {
                return a === 'All' ? 1 : b === 'All' ? -1 : +a - +b;
            });
        } else settings.cutoff = settings.cutoff.toString() || nGroupsControl.values[0];
    }

    function syncControlInputs(controlInputs, settings) {
        var syncedControlInputs = settings.clone(controlInputs);
        syncGroupBy(syncedControlInputs, settings);
        syncStatusGroup(syncedControlInputs, settings);
        syncFilters$1(syncedControlInputs, settings);
        syncShowFirstNGroups(syncedControlInputs, settings);
        return syncedControlInputs;
    }

    var configuration = {
        rendererSettings: rendererSettings,
        chartSettings: chartSettings,
        listingSettings: listingSettings,
        settings: Object.assign({}, rendererSettings(), chartSettings(), listingSettings()),
        syncSettings: syncSettings,
        controlInputs: controlInputs,
        syncControlInputs: syncControlInputs
    };

    function layout(element) {
        var containers = {
            main: d3
                .select(element)
                .append('div')
                .classed('query-overview', true)
        };
        containers.topRow = containers.main.append('div').classed('qo-row qo-row--top', true);
        containers.controls = containers.topRow
            .append('div')
            .classed('qo-component qo-component--controls', true);
        containers.chart = containers.controls
            .append('div')
            .classed('qo-component qo-component--chart', true);
        containers.bottomRow = containers.main.append('div').classed('qo-row qo-row--bottom', true);
        containers.listing = containers.bottomRow
            .append('div')
            .classed('qo-component qo-component--listing', true);
        return containers;
    }

    function styles(document) {
        var styles = [
            /***--------------------------------------------------------------------------------------\
        Framework
      \--------------------------------------------------------------------------------------***/
            '.query-overview {' + '    width: 100%;' + '    display: inline-block;' + '}',
            '.qo-row {' + '    width: 100%;' + '    display: inline-block;' + '}',
            '.qo-component {' + '}',
            '.qo-row--top {' + '}',
            '.qo-row--bottom {' + '}',
            /***--------------------------------------------------------------------------------------\
        Controls
      \--------------------------------------------------------------------------------------***/
            '.qo-component--controls {' + '    width: 100%;' + '}',
            '.qo-component--controls .wc-controls {' + '    margin-bottom: 0;' + '}',
            '.qo-control-grouping {' + '    display: inline-block;' + '}',
            '.qo-button {' + '    float: left;' + '    display: block;' + '}',
            '.qo-control-grouping--label,' +
                '.wc-control-label {' +
                '    cursor: help;' +
                '    margin-bottom: 3px;' +
                '}',
            '.qo-control-grouping--label {' +
                '    text-align: center;' +
                '    width: 100%;' +
                '    font-size: 24px;' +
                '    border-bottom: 2px solid #aaa;' +
                '}',
            '.span-description {' + '    display: none !important;' + '}',
            /****---------------------------------------------------------------------------------\
        Other controls
      \---------------------------------------------------------------------------------****/
            '.qo-control-grouping--other-controls {' +
                '    width: 20%;' +
                '    float: right;' +
                '}',
            '.qo-control-grouping--other-controls .control-group {' +
                '    width: 100%;' +
                '    margin-bottom: 15px;' +
                '}',
            '.qo-control-grouping--other-controls .control-group:nth-child(n+3) {' +
                '    border-top: 1px solid #aaa;' +
                '}',
            '.qo-control-grouping--other-controls .control-group .wc-control-label {' +
                '    text-align: center;' +
                '    font-size: 110%;' +
                '}', //dropdowns
            '.qo-dropdown {' + '}',
            '.qo-dropdown .wc-control-label {' + '}',
            '.qo-dropdown .changer {' + '    margin: 0 auto;' + '}', //radio buttons
            '.qo-radio {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '    flex-wrap: wrap;' +
                '}',
            '.qo-radio .wc-control-label {' + '    width: 100%;' + '}',
            '.qo-radio .radio {' + '    margin-top: 0 !important;' + '}', //checkboxes
            '.qo-checkbox {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '}',
            '.qo-checkbox .wc-control-label {' + '    margin-right: 5px;' + '}',
            '.qo-checkbox .changer {' + '    margin-top: 5px !important;' + '}',
            /****---------------------------------------------------------------------------------\
        Filters
      \---------------------------------------------------------------------------------****/
            '.qo-control-grouping--filters {' +
                '    width: 20%;' +
                '    float: left;' +
                (!/trident/i.test(navigator.userAgent)
                    ? '    display: flex;' +
                      '    flex-wrap: wrap;' +
                      '    justify-content: space-evenly;'
                    : '    display: inline-block;') +
                '}',
            '.qo-subsetter {' +
                '    margin: 5px 2px !important;' +
                '    border-top: 1px solid #aaa;' +
                '    padding-top: 5px;' +
                '    display: inline-block !important;' +
                '    vertical-align: top;' +
                '}',
            '.qo-subsetter .wc-control-label {' +
                '    margin: 0 5px 3px 0;' +
                '    text-align: center;' +
                '}',
            '.qo-select-all {' + '}',
            '.qo-subsetter .changer {' + '    margin: 0 auto;' + '}',
            /***--------------------------------------------------------------------------------------\
        Chart
      \--------------------------------------------------------------------------------------***/
            '.qo-component--chart {' +
                '    width: 58%;' +
                '    margin: 0 auto;' +
                '    position: relative;' +
                '}',
            '.qo-button--reset-chart {' +
                '    position: absolute;' +
                '    top: 0;' +
                '    left: 0;' +
                '    z-index: 2;' +
                '    width: 91px;' +
                '    padding: 3px 0;' +
                '}',
            '.qo-button--undo {' +
                '    position: absolute;' +
                '    bottom: 0;' +
                '    left: 0;' +
                '    z-index: 2;' +
                '    width: 91px;' +
                '    padding: 3px 0;' +
                '}',
            '.qo-component--chart .wc-chart {' + '    z-index: 1;' + '}',
            '.qo-component--chart .legend-title {' + '    cursor: help;' + '}',
            '.qo-component--chart .legend-item {' +
                '    cursor: pointer;' +
                '    border-radius: 4px;' +
                '    padding: 5px;' +
                '    padding-left: 8px;' +
                '    margin-right: 5px !important;' +
                '}',
            '.qo-component--chart .y.axis .tick text {' +
                '    font-family: "Lucida Console", "Courier New", "Monospace";' +
                '    font-size: 14px;' +
                '}',
            '.qo-footnote {' +
                '    width: 100%;' +
                '    text-align: center;' +
                '    font-style: italic;' +
                '}',
            /***--------------------------------------------------------------------------------------\
        Listing
      \--------------------------------------------------------------------------------------***/
            '.qo-component--listing {' + '    width: 100%;' + '}',
            '.qo-button--reset-listing {' +
                '    padding: 3px;' +
                '    margin: 10px 5px 10px 0;' +
                '}',
            '.qo-table-container {' +
                '    overflow-x: auto;' +
                '    width: 100%;' +
                '    transform: rotate(180deg);' +
                '    -webkit-transform: rotate(180deg); ' +
                '}',
            '.qo-table {' +
                '    width: 100%;' +
                '    transform: rotate(180deg);' +
                '    -webkit-transform: rotate(180deg); ' +
                '    display: table;' +
                '}',
            '.qo-table th {' + '    white-space: nowrap;' + '}',
            '.qo-table th,' +
                '.qo-table td {' +
                '    min-width: 100px;' +
                '    padding-right: 10px !important;' +
                '}'
        ]; //Attach styles to DOM.

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
    }

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

        var queryAgeCol = this.config.status_groups.find(function(status_group) {
            return status_group.label === 'Query Age';
        }).value_col;
        var queryRecencyCol = this.config.filters.find(function(filter) {
            return filter.label === 'Query Recency';
        }).value_col;
        this.raw_data.forEach(function(d) {
            //Concatenate form and field to avoid duplicates across forms.
            d['Form: Field'] = d[_this.config.form_col] + ': ' + d[_this.config.field_col]; //Define query age.

            if (_this.config.age_statuses.indexOf(d[_this.config.status_col]) < 0)
                d[queryAgeCol] = d[_this.config.status_col];
            else {
                var age = +d[_this.config.age_col];

                _this.config.ageRanges.forEach(function(ageRange, i) {
                    if (i === 0 && ageRange[0] <= age && age <= ageRange[1])
                        d[queryAgeCol] = _this.config.ageRangeCategories[i];
                    else if (i === _this.config.ageRanges.length - 1 && ageRange[0] < age)
                        d[queryAgeCol] = _this.config.ageRangeCategories[i];
                    else if (ageRange[0] < age && age <= ageRange[1])
                        d[queryAgeCol] = _this.config.ageRangeCategories[i];
                });
            } //Define query recency.

            if (d.hasOwnProperty(_this.config.recency_category_col)) {
                d[queryRecencyCol] = d[_this.config.recency_category_col] || 'N/A';
            } else if (d.hasOwnProperty(_this.config.recency_col)) {
                var recency = +d[_this.config.recency_col];

                _this.config.recencyRanges.forEach(function(recencyRange, i) {
                    if (i === 0 && recencyRange[0] <= recency && recency <= recencyRange[1])
                        d[queryRecencyCol] = _this.config.recencyRangeCategories[i];
                    else if (
                        i === _this.config.recencyRanges.length - 1 &&
                        recencyRange[0] < recency
                    )
                        d[queryRecencyCol] = _this.config.recencyRangeCategories[i];
                    else if (recencyRange[0] < recency && recency <= recencyRange[1])
                        d[queryRecencyCol] = _this.config.recencyRangeCategories[i];
                });
            }
        });
    }

    function defineQueryStatusSet() {
        var _this = this;

        var queryStatusInput = this.controls.config.inputs.find(function(input) {
            return input.value_col === _this.config.status_col;
        });
        var queryStatusGroup = this.config.status_groups.find(function(status_group) {
            return status_group.value_col === _this.config.status_col;
        });
        var queryStatusOrder =
            Array.isArray(queryStatusGroup.order) && queryStatusGroup.order.length
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

    function defineQueryRecencySet() {
        var queryRecencyInput = this.controls.config.inputs.find(function(input) {
            return input.value_col === 'queryrecency';
        });

        if (this.raw_data[0].hasOwnProperty(this.config.recency_category_col)) {
            queryRecencyInput.values = d3
                .set(
                    this.raw_data.map(function(d) {
                        return d.queryrecency;
                    })
                )
                .values()
                .sort(function(a, b) {
                    var anum = parseFloat(a);
                    var bnum = parseFloat(b);
                    var diff = anum - bnum;
                    return diff ? diff : a < b ? -1 : a > b ? 1 : 0;
                });
        } else if (this.raw_data[0].hasOwnProperty(this.config.recency_col))
            queryRecencyInput.values = this.config.recencyRangeCategories;
        else
            this.controls.config.inputs.splice(
                this.controls.config.inputs.findIndex(function(input) {
                    return input.value_col === 'queryrecency';
                }),
                1
            );
    }

    function defineMaps() {
        var _this = this;

        this.maps = {
            querystatus: d3
                .nest()
                .key(function(d) {
                    return d[_this.config.status_col];
                })
                .rollup(function(d) {
                    return d3
                        .set(
                            d.map(function(di) {
                                return di.queryage;
                            })
                        )
                        .values();
                })
                .map(this.raw_data),
            queryage: d3
                .nest()
                .key(function(d) {
                    return d.queryage;
                })
                .rollup(function(d) {
                    return d3
                        .set(
                            d.map(function(di) {
                                return di[_this.config.status_col];
                            })
                        )
                        .values();
                })
                .map(this.raw_data)
        };
    }

    function removeInvalidControls() {
        var context = this; // if the variable for the filter or the variable used to derive the filter
        // are missing from that data -> remove them

        var updated_inputs = this.controls.config.inputs.filter(function(d) {
            return d.derive_source
                ? d.derive_source in context.raw_data[0]
                : d.value_col
                ? d.value_col in context.raw_data[0]
                : true;
        });
        this.controls.config.inputs = updated_inputs;
    }

    function onInit() {
        //Define new variables.
        defineNewVariables.call(this); //Define query statuses.

        defineQueryStatusSet.call(this); //Define query recency categories.

        defineQueryRecencySet.call(this); //Define detail listing settings.

        defineListingSettings.call(this); //Define query age and query status maps.

        defineMaps.call(this); //hide controls that do not have their variable supplied

        removeInvalidControls.call(this); //Initialize listing.

        this.listing.init(this.raw_data, this.listing.test);
    }

    function classControls() {
        this.controls.controlGroups = this.controls.wrap
            .selectAll('.control-group')
            .attr('class', function(d) {
                return 'control-group qo-'
                    .concat(d.type, ' qo-')
                    .concat(d.type, '--')
                    .concat(d.label.toLowerCase().replace(/[^_a-zA-Z-]/g, '-'));
            });
    }

    function groupControls() {
        var context = this; //Group filters.

        this.controls.filters = {
            container: this.controls.wrap
                .insert('div', '.qo-subsetter')
                .classed('qo-control-grouping qo-control-grouping--filters', true)
        };
        this.controls.filters.container
            .append('div')
            .classed('qo-control-grouping--label', true)
            .attr(
                'title',
                'Filters subset the data underlying the chart and listing.\nHover over filter labels to view more information about them.'
            )
            .text('Filters');
        this.controls.filters.controlGroups = this.controls.wrap.selectAll('.qo-subsetter');
        this.controls.filters.labels = this.controls.filters.controlGroups.selectAll(
            '.wc-control-label'
        );
        this.controls.filters.selects = this.controls.filters.controlGroups.selectAll('.changer');
        this.controls.filters.controlGroups.each(function(d) {
            context.controls.filters.container.node().appendChild(this);
        }); //Group other controls.

        this.controls.otherControls = {
            container: this.controls.wrap
                .insert('div', ':first-child')
                .classed('qo-control-grouping qo-control-grouping--other-controls', true)
        };
        this.controls.otherControls.label = this.controls.otherControls.container
            .append('div')
            .classed('qo-control-grouping--label', true)
            .attr(
                'title',
                'Controls alter the display of the chart.\nHover over control labels to view more information about them.'
            )
            .text('Controls');
        this.controls.otherControls.controlGroups = this.controls.wrap.selectAll(
            '.control-group:not(.qo-subsetter)'
        );
        this.controls.otherControls.labels = this.controls.otherControls.controlGroups.selectAll(
            '.wc-control-label'
        );
        this.controls.otherControls.controlGroups.each(function(d) {
            context.controls.otherControls.container.node().appendChild(this);
        });
    }

    function addControlTooltips() {
        var tooltips = {
            //other controls
            'Group by':
                'Controls the variable with which the queries are grouped; each group is plotted along the vertical axis of the chart.',
            'Status Group': 'Controls the variable with which the bars are subdivided.',
            'Bar Arrangement':
                'Controls the layout of the status groups.\n- stacked: status groups are plotted side-by-side horizontally\n- grouped: status groups are plotted side-by-side vertically',
            'Show First N Groups': 'Controls the number of groups displayed on the vertical axis.',
            'Order Groups Alphabetically?':
                'Controls the order of the groups; uncheck to sort groups by magnitude (largest to smallest number of queries) instead of alphabetically.',
            //filters
            'Query Age':
                'Open queries are broken down into how long they have been open. All other queries are classified by status (answered, closed, cancelled).',
            'Query Status':
                'Open: site has not responded to the issue\nAnswered: site has responded to issue; DM needs to review\nClosed: issue resolved\nCancelled: query cancelled by DM',
            'Query Recency':
                'Number of days a query has been open, regardless of its current status (applies only to queries opened in the past 30 days)',
            Form:
                'CRF page abbreviation; hover over the abbreviation in the chart to see its full name.',
            Site: 'Name or ID of site',
            'Marking Group': 'Entity that opened the query',
            'Visit/Folder':
                'Visit/folder abbreviation; hover over the visit/folder abbreviation in the chart to see the full name.'
        };
        this.controls.controlGroups.each(function(d) {
            var tooltip =
                tooltips[d.label] ||
                'This '
                    .concat(d.type, ' controls ')
                    .concat(d.value_col || d.option || d.options.join(', '), '.');
            if (tooltips[d.label] === undefined)
                console.warn(
                    'The control labeled '
                        .concat(d.label, ' does not have a curated tooltip. Defaulting to ')
                        .concat(tooltip, '.')
                );
            d3.select(this)
                .selectAll('.wc-control-label')
                .attr('title', tooltip);
        });
    }

    function updateGroupByOptions() {
        var context = this;
        this.controls.wrap
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
                context.config.y.label = label; //Update y-axis variable.

                var value_col = context.config.groups.find(function(group) {
                    return group.label === label;
                }).value_col;
                context.config.y.column = value_col;
                context.config.marks[0].per = [value_col];
                context.draw();
            });
    }

    function addGroupByHighlight() {
        var _this = this;

        this.controls.otherControls.controlGroups
            .filter(function(d) {
                return d.label === 'Group by';
            })
            .on('mouseover', function() {
                _this.svg.selectAll('.y.axis .axis-title').style({
                    'font-weight': 'bold',
                    'text-decoration': 'underline',
                    fill: 'red'
                });
            })
            .on('mouseout', function() {
                _this.svg.selectAll('.y.axis .axis-title').style({
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    fill: 'black'
                });
            });
    }

    function checkInitialStatusGroup() {
        var _this = this;

        this.controls.otherControls.controlGroups
            .filter(function(d) {
                return d.label === 'Status Group';
            })
            .selectAll('.radio')
            .selectAll('.changer')
            .property('checked', function(d) {
                return d === _this.config.legend.label;
            });
    }

    function addStatusGroupHighlight() {
        var _this = this;

        this.controls.otherControls.controlGroups
            .filter(function(d) {
                return d.label === 'Status Group';
            })
            .on('mouseover', function() {
                _this.legend.select('.legend-title').style({
                    'text-decoration': 'underline',
                    color: 'red'
                });
            })
            .on('mouseout', function() {
                _this.legend.select('.legend-title').style({
                    'text-decoration': 'none',
                    color: 'black'
                });
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
                d3.select(this)
                    .selectAll('option')
                    .sort(function(a, b) {
                        return d.order ? d.order.indexOf(a) - d.order.indexOf(b) : a < b ? -1 : 1;
                    });
            });
    }

    function syncQueryAgeAndStatus(d, checked) {
        var checkbox =
            d.label === 'Query Age'
                ? this.controls.filters.checkboxes.filter(function(di) {
                      return di.label === 'Query Status';
                  })
                : this.controls.filters.checkboxes.filter(function(di) {
                      return di.label === 'Query Age';
                  });
        checkbox.property('checked', checked);
        var datum = checkbox.datum(); //Update checkbox tooltip.

        checkbox.attr(
            'title',
            checked
                ? 'Deselect all '.concat(datum.label, ' options')
                : 'Select all '.concat(datum.label, ' options')
        ); //Update filter object.

        var filter = this.filters.find(function(filter) {
            return filter.col === datum.value_col;
        });
        if (checked) filter.val = filter.choices;
        else filter.val = [];
    }

    function updateFilter(d, element) {
        var checkbox = d3.select(element);
        var checked = element.checked; //Update checkbox tooltip.

        checkbox.attr(
            'title',
            checked
                ? 'Deselect all '.concat(d.label, ' options')
                : 'Select all '.concat(d.label, ' options')
        ); //Update filter object.

        var filter = this.filters.find(function(filter) {
            return filter.col === d.value_col;
        });
        if (checked) filter.val = filter.choices;
        else filter.val = []; //Sync query age and status filters.

        syncQueryAgeAndStatus.call(this, d, checked); //Redraw.

        this.draw();
    }

    function addSelectAll() {
        var context = this;
        this.controls.filters.labels
            .filter(function(d) {
                return d.multiple;
            }) // only multi-selects
            .each(function(d) {
                //Add checkbox to filter label.
                var label = d3
                    .select(this)
                    .html(
                        ''.concat(
                            d.label,
                            ' <input class = "qo-select-all" type = "checkbox"></input>'
                        )
                    ); //Add event listener to select-all checkbox.

                var checkbox = label
                    .select('input')
                    .datum(d)
                    .attr('title', 'Deselect all '.concat(d.label, ' options'))
                    .property('checked', true)
                    .on('click', function(di) {
                        //Update filter dropdown.
                        updateFilter.call(context, di, this);
                    });
            }); //Attach checkboxes to filters object.

        this.controls.filters.checkboxes = this.controls.filters.labels.selectAll('.qo-select-all');
    }

    function updateSelectAll(d, selectedOptions) {
        //Update filter object.
        var filter = this.filters.find(function(filter) {
            return filter.col === d.value_col;
        });
        filter.val = d.multiple ? selectedOptions : selectedOptions.pop(); //Update checkbox.

        if (d.multiple) {
            var checked = filter.val.length === filter.choices.length;
            var checkbox = this.controls.filters.checkboxes
                .filter(function(di) {
                    return di.value_col === d.value_col;
                })
                .attr(
                    'title',
                    checked
                        ? 'Deselect all '.concat(d.label, ' options')
                        : 'Select all '.concat(d.label, ' options')
                )
                .property('checked', checked);
        }
    }

    function syncQueryAgeAndStatus$1(d, selectedOptions) {
        var _this = this;

        var filter;
        var select;
        var map;

        if (d.value_col === 'queryage') {
            filter = this.filters.find(function(filter) {
                return filter.col === _this.config.status_col;
            });
            select = this.controls.wrap.selectAll('select').filter(function(d) {
                return d.value_col === _this.config.status_col;
            });
            map = this.maps.queryage;
        } else if (d.value_col === this.config.status_col) {
            filter = this.filters.find(function(filter) {
                return filter.col === 'queryage';
            });
            select = this.controls.wrap.selectAll('select').filter(function(d) {
                return d.value_col === 'queryage';
            });
            map = this.maps.querystatus;
        }

        var correspondingOptions = d3
            .set(
                d3.merge(
                    Object.keys(map)
                        .filter(function(key) {
                            return selectedOptions.indexOf(key) > -1;
                        })
                        .map(function(key) {
                            return map[key];
                        })
                )
            )
            .values();
        filter.val = correspondingOptions;
        select.selectAll('option').property('selected', function(di) {
            return correspondingOptions.indexOf(di) > -1;
        }); //Update select-all checkbox.

        updateSelectAll.call(this, select.datum(), correspondingOptions);
    }

    function updateFilterEventListeners() {
        var context = this; //Update filter event listeners.

        this.controls.filters.selects.on('change', function(d) {
            var select = d3.select(this);
            var selectedOptions = select.selectAll('option:checked').data(); //Update select-all checkbox.

            updateSelectAll.call(context, d, selectedOptions); //Sync query age and query status filters.

            if (['Query Age', 'Query Status'].indexOf(d.label) > -1)
                syncQueryAgeAndStatus$1.call(context, d, selectedOptions); //Redraw.

            context.draw();
        });
    }

    function addTooltipsToFilterOptions() {
        this.controls.filters.selects.selectAll('option').attr('title', function(d) {
            return d;
        });
    }

    function sortQueryRecencyOptions() {
        this.controls.filters.selects
            .filter(function(d) {
                return d.value_col === 'queryrecency';
            })
            .selectAll('option')
            .sort(function(a, b) {
                var anum = parseFloat(a);
                var bnum = parseFloat(b);
                var diff = anum - bnum;
                return diff ? diff : a < b ? -1 : a > b ? 1 : 0;
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

        this.resetButton = d3
            .select(this.div)
            .insert('button', ':first-child')
            .classed('qo-button qo-button--reset-chart', true)
            .text('Reset chart')
            .on('click', function() {
                var element = _this.element;
                var settings = clone(_this.initialSettings);
                var data = clone(_this.raw_data);

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
                    }); //Reset listing.

                context.listing.wrap.selectAll('*').remove();
                context.listing.init(context.filtered_data);
            });
    }

    function addFootnotes() {
        this.footnotes = {
            barClick: this.wrap
                .append('div')
                .classed('qo-footnote qo-footnote--bar-click', true)
                .text('Click one or more bars to view the underlying data in the listing below.'),
            deselectBars: this.wrap
                .append('div')
                .classed('qo-footnote qo-footnote--deselect-bars', true)
                .text('Click in the white area to deselect all bars.')
        };
    }

    function onLayout() {
        //Class controls for unique selection.
        classControls.call(this); //Group controls logically.

        groupControls.call(this); //Add tooltips to controls.

        addControlTooltips.call(this); //Display group label rather than group column name in Group by control.

        updateGroupByOptions.call(this); //Highlight y-axis label when user hovers over Status Group control.

        addGroupByHighlight.call(this); //Check radio button of initial status group.

        checkInitialStatusGroup.call(this); //Highlight legend when user hovers over Status Group control.

        addStatusGroupHighlight.call(this); //Customize dropdowns with multiple options.

        customizeMultiSelects.call(this); //Add select all checkbox to filters.

        addSelectAll.call(this); //Update filter event listeners to toggle select all checkbox on change.

        updateFilterEventListeners.call(this); //Add tooltips to filter options.

        addTooltipsToFilterOptions.call(this); //Sort query recency categories numerically if possible.

        sortQueryRecencyOptions.call(this); //Handle y-domain length control

        setYAxisDomainLength.call(this); //Add reset button.

        addResetButton.call(this); //Clear listing when controls change.

        clearListingOnChange.call(this); //Add chart footnotes.

        addFootnotes.call(this);
    }

    function updateStratification() {
        var statusGroup = this.controls.wrap
            .selectAll('.qo-radio--status-group')
            .selectAll('.radio')
            .filter(function() {
                var label = d3.select(this);
                var radio = label.select('.changer');
                return radio.property('checked');
            })
            .text();
        this.config.status_group = this.config.status_groups.find(function(status_group) {
            return status_group.label === statusGroup;
        });
        this.config.marks[0].split = this.config.status_group.value_col;
        this.config.color_by = this.config.status_group.value_col;
        this.config.color_dom = this.config.status_group.order;
        this.config.colors = this.config.status_group.colors;
        this.config.legend.label = this.config.status_group.label;
        this.config.legend.order = this.config.color_dom.slice();
        this.config.marks[0].tooltip = '['.concat(this.config.color_by, '] - $x queries');
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
                d3.select(this)
                    .selectAll('option')
                    .property('selected', function(di) {
                        return filter.val === 'All' || filter.val.indexOf(di) > -1;
                    });
            });
    }

    function updateRangeBand() {
        if (this.config.marks[0].arrange === 'stacked') {
            this.config.range_band = this.initialSettings.range_band;
        } else {
            this.config.range_band = this.initialSettings.range_band * this.config.color_dom.length;
        }
    }

    function onPreprocess() {
        highlightSelectedOptions.call(this);
        updateStratification.call(this);
        updateRangeBand.call(this);
    }

    function onDataTransform() {}

    function setLeftMargin() {
        this.config.fontSize = parseInt(this.wrap.style('font-size'));
        console.log(this.config.fontSize); //Give the y-axis tick labels a maximum margin of one quarter of the container width.

        this.config.maxYAxisTickWidth = this.div.offsetWidth / 4; //Find maximum number of characters in the y-axis tick labels (minimum: 7 characters).

        this.config.maxYAxisTickLabelLength =
            Math.max(
                7,
                d3.max(this.y_dom, function(d) {
                    return d.length;
                })
            ) *
                this.config.fontSize *
                0.5 +
            this.config.fontSize * 1.5 * 1.5 +
            6; //Set the left margin to the minimum of one quarter of the container width and the maximum number of characters in the y-axis tick labels (minimum: 100 pixels).

        this.config.margin.left = Math.min(
            this.config.maxYAxisTickWidth,
            Math.max(this.config.maxYAxisTickLabelLength, 100)
        );
    }

    function setXDomain() {
        if (this.filtered_data.length === 0) this.x_dom = [0, 0];
    }

    function setYDomain() {
        var _this = this;

        //Sort summarized data by descending total.
        this.current_data.sort(function(a, b) {
            return b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
        }); //Sort y-domain by descending total.

        this.y_dom.sort(function(a, b) {
            var order = _this.current_data.map(function(d) {
                return d.key;
            });

            return order.indexOf(b) < order.indexOf(a)
                ? -1
                : order.indexOf(b) > order.indexOf(a)
                ? 1
                : order.indexOf(b) >= order.indexOf(a)
                ? 0
                : NaN;
        }); //Limit y-domain to key values in summarized data.

        this.y_dom = this.y_dom.filter(function(d) {
            return (
                _this.current_data
                    .map(function(di) {
                        return di.key;
                    })
                    .indexOf(d) > -1
            );
        }); //Sort y-domain alphanumerically or descending total.

        this.y_dom = this.config.alphabetize ? this.y_dom.sort(d3.descending) : this.y_dom; //Limit y-domain to first [chart.config.cutoff] values.

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
        this.raw_height = this.filtered_data.length
            ? Math.max(
                  (+this.config.range_band + this.config.range_band * this.config.padding) *
                      this.y_dom.length,
                  100
              )
            : 100;
    }

    function updateXAxisLabel() {
        this.svg
            .select('.x.axis')
            .select('.axis-title')
            .text(
                this.config.x.label +
                    ' (' +
                    String(
                        d3.sum(this.current_data, function(d) {
                            return d.total;
                        })
                    ) +
                    ')'
            );
    }

    function resetYAxisTickLabels() {
        this.svg.selectAll('.y.axis .tick').remove();
    }

    function onDraw() {
        setLeftMargin.call(this);
        setXDomain.call(this);
        setYDomain.call(this);
        setChartHeight.call(this);
        updateXAxisLabel.call(this);
        resetYAxisTickLabels.call(this);
    }

    function legendFilter() {
        var _this = this;

        var context = this; //Alter layout of legend.

        var legend = this.legend;
        legend.style('margin-left', ''.concat(this.margin.left, 'px'));
        var legendTitle = legend.select('.legend-title');
        legendTitle.attr(
            'title',
            'Add and remove queries by clicking the legend items to the left.'
        );
        legend.node().appendChild(legendTitle.node()); //Filter data by clicking on legend.

        var statusFilter = this.filters.find(function(filter) {
            return filter.col === _this.config.color_by;
        });
        var legendItems = this.wrap
            .selectAll('.legend-item')
            .classed('selected', function(d) {
                return statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1;
            })
            .style('background', function(d) {
                return statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1
                    ? 'lightgray'
                    : 'white';
            });
        var statusControlGroup = this.controls.wrap.selectAll('.control-group').filter(function(d) {
            return d.value_col === context.config.marks[0].split;
        });
        var statusOptions = statusControlGroup.selectAll('.changer option'); // status filter options

        legendItems.selectAll('.legend-mark-text').remove(); // don't need 'em

        legendItems.selectAll('.legend-color-block').attr('width', '8px');
        legendItems.on('click', function(d) {
            var legendItem = d3.select(this); // clicked legend item

            var selected = !legendItem.classed('selected'); // selected boolean

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

            updateSelectAll.call(context, statusControlGroup.datum(), selectedLegendItems);
            syncQueryAgeAndStatus$1.call(context, statusControlGroup.datum(), selectedLegendItems);
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
            })[0].val = selectedLegendItems; //Clear bar highlighting.

            context.svg
                .selectAll('.bar')
                .classed('selected', false)
                .style({
                    'stroke-width': '1px',
                    fill: function fill(d) {
                        return context.colorScale(d.key);
                    }
                });
            context.draw(); //Remove listing and display bar click footnote.

            context.listing.wrap.selectAll('*').remove();
            context.listing.init(filtered_data);
        });
    }

    function addYAxisTickTooltips() {
        var _this = this;

        var yAxisTicks = this.svg
            .selectAll('.y.axis .tick')
            .filter(function(form) {
                return _this.y_dom.indexOf(form) > -1;
            })
            .style('cursor', 'default');

        switch (this.config.y.column) {
            case this.config.form_col:
                yAxisTicks.append('title').text(function(form) {
                    return 'Form: '.concat(
                        _this.raw_data.filter(function(d) {
                            return d[_this.config.form_col] === form;
                        })[0][_this.config.formDescription_col] || form
                    );
                });
                break;

            case 'Form: Field':
                yAxisTicks
                    .style('cursor', 'help')
                    .append('title')
                    .text(function(field) {
                        var datum = _this.raw_data.filter(function(d) {
                            return d['Form: Field'] === field;
                        })[0];

                        return 'Form: '
                            .concat(
                                datum[_this.config.formDescription_col] ||
                                    datum[_this.config.form_col],
                                '\nField: '
                            )
                            .concat(
                                datum[_this.config.fieldDescription_col] ||
                                    datum[_this.config.field_col]
                            );
                    });
                break;

            default:
                yAxisTicks.append('title').text(function(d) {
                    return d;
                });
        }
    }

    function addYAxisTickClick() {
        var _this = this;

        if (this.config.y.column === this.config.form_col) {
            var yLabels = this.svg
                .selectAll('.y.axis .tick')
                .style('fill', 'blue')
                .style('text-decoration', 'underline');
            yLabels.style('cursor', 'pointer').on('click', function(yLabel) {
                //Update Group by control.
                var groupByControl = _this.controls.otherControls.controlGroups.filter(function(d) {
                    return d.label === 'Group by';
                });

                groupByControl
                    .select('.wc-control-label')
                    .style({
                        'font-weight': 'bold',
                        'text-decoration': 'underline',
                        color: 'red'
                    })
                    .transition()
                    .delay(3000)
                    .style({
                        'font-weight': 'normal',
                        'text-decoration': 'none',
                        color: 'black'
                    });
                groupByControl.selectAll('option').property('selected', function(d) {
                    return d === 'Form: Field';
                }); //Update chart settings.

                _this.config.y.column = 'Form: Field';
                _this.config.y.label = 'Form: Field';
                _this.config.marks[0].per[0] = 'Form: Field'; //Update Form filter.

                var formFilter = _this.controls.filters.controlGroups.filter(function(d) {
                    return d.label === 'Form';
                });

                formFilter
                    .select('.wc-control-label')
                    .style({
                        'font-weight': 'bold',
                        'text-decoration': 'underline',
                        color: 'red'
                    })
                    .transition()
                    .delay(3000)
                    .style({
                        'font-weight': 'normal',
                        'text-decoration': 'none',
                        color: 'black'
                    });
                formFilter.selectAll('option').property('selected', function(d) {
                    return d === yLabel;
                }); //Update Form filter object in `chart.filters`.

                var filter = _this.filters.find(function(filter) {
                    return filter.col === _this.config.form_col;
                });

                filter.val = yLabel;
                updateSelectAll.call(
                    _this,
                    _this.controls.filters.controlGroups
                        .filter(function(d) {
                            return d.value_col === _this.config.form_col;
                        })
                        .datum(),
                    [yLabel]
                ); //Redraw chart and listing.
                //Update Group by control.

                _this.draw();

                _this.listing.wrap.selectAll('*').remove();

                _this.listing.init(_this.filtered_data); //Highlight y-axis label.

                _this.svg
                    .select('.y.axis .axis-title')
                    .style({
                        'font-weight': 'bold',
                        'text-decoration': 'underline',
                        fill: 'red'
                    })
                    .transition()
                    .delay(3000)
                    .style({
                        'font-weight': 'normal',
                        'text-decoration': 'none',
                        fill: 'black'
                    });
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
                .text('and '.concat(this.y_dom_length - this.y_dom.length, ' more'))
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
                    'The number of '.concat(
                        this.config.y.label.toLowerCase(),
                        's can be changed with the Show First N Groups radio buttons.'
                    )
                );
        }
    }

    function truncateYAxisTickLabels() {
        var yAxisLabelHeight = this.svg
            .select('.y.axis .axis-title')
            .node()
            .getBBox().height;
        var yAxisTickLabelSpace = this.config.maxYAxisTickWidth - yAxisLabelHeight - 4;
        if (this.config.maxYAxisTickLabelLength > yAxisTickLabelSpace)
            this.svg.selectAll('.y.axis .tick text').each(function(d) {
                var textWidth = this.getBBox().width;

                if (textWidth > yAxisTickLabelSpace) {
                    var charWidth = textWidth / d.length;
                    var nChar = Math.floor(yAxisTickLabelSpace / charWidth);
                    this.textContent = d.substring(0, nChar - 3) + '...';
                }
            });
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
                                    (context.y.rangeBand() *
                                        (context.config.color_dom.length -
                                            1 -
                                            context.config.color_dom.indexOf(di.key))) /
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

    function mouseoverStyle(bar, selected) {
        if (!selected)
            bar.style({
                'stroke-width': '5px',
                fill: 'black'
            });
    }

    function mouseoverAttrib(bar, selected) {
        if (!selected) {
            var BBox = bar.node().getBBox();
            BBox = {
                height: BBox.height,
                width: BBox.width,
                x: BBox.x,
                y: BBox.y
            };
            var offset = BBox.width > 2.5 ? 2.5 : BBox.width / 2; // for bars 2.5px wide or narrower

            bar.attr({
                width: function width(d) {
                    d.BBox = BBox;
                    d.BBox.width = BBox.width - offset;
                    d.offset = offset;
                    return d.BBox.width;
                },
                x: function x(d) {
                    d.BBox.x = BBox.x + offset;
                    return d.BBox.x;
                }
            });
        }
    }

    function mouseoutStyle(bar, selected) {
        var _this = this;

        var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!(selected || clear) || (selected && clear))
            bar.style({
                'stroke-width': '1px',
                fill: function fill(d) {
                    return _this.colorScale(d.key);
                }
            });
    }

    function mouseoutAttrib(bar, selected) {
        var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!(selected || clear) || (selected && clear)) {
            bar.attr({
                width: function width(d) {
                    d.BBox.width = d.BBox.width + d.offset;
                    return d.BBox.width;
                },
                x: function x(d) {
                    d.BBox.x = d.BBox.x - d.offset;
                    return d.BBox.x;
                }
            });
        }
    }

    function resetListing() {
        //Capture data from selected bars.
        var selectedData = this.svg
            .selectAll('rect.selected')
            .data()
            .flatMap(function(d) {
                return d.values.raw;
            });
        this.listing.draw(selectedData.length > 0 ? selectedData : this.filtered_data);
    }

    function addBarClick() {
        var context = this; // will subtract and add to bar to offset increase in stroke-width and prevent bars
        // from overlapping as much when neighbors are both selected.

        this.bars = this.svg
            .selectAll('.bar')
            .style('cursor', 'pointer')
            .on('mouseover', function() {
                var bar = d3.select(this);
                var selected = bar.classed('selected'); //Apply highlight attributes and styles to bar.

                mouseoverStyle.call(context, bar, selected);
                mouseoverAttrib.call(context, bar, selected); //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.

                if (!/trident/i.test(navigator.userAgent)) d3.select(this).moveToFront();
            })
            .on('mouseout', function() {
                var bar = d3.select(this);
                var selected = bar.classed('selected'); //Apply default attributes and styles to bar.

                mouseoutStyle.call(context, bar, selected);
                mouseoutAttrib.call(context, bar, selected); //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.

                if (!/trident/i.test(navigator.userAgent))
                    context.bars
                        .filter(function() {
                            return d3.select(this).classed('selected');
                        })
                        .moveToFront();
            })
            .on('click', function(d) {
                var bar = d3.select(this);
                var selected = bar.classed('selected'); //Update selected class of clicked bar.

                bar.classed('selected', !selected); //Reset listing.

                resetListing.call(context);
            });
    }

    function addBarDeselection() {
        var _this = this;

        var context = this;
        this.overlay.on('click', function() {
            _this.bars.each(function(d) {
                var bar = d3.select(this);
                var selected = bar.classed('selected');
                mouseoutStyle.call(context, bar, selected, true);
                mouseoutAttrib.call(context, bar, selected, true);
                bar.classed('selected', false);
            });

            resetListing.call(_this);
        });
    }

    function addNoDataIndicator() {
        this.svg.select('.qo-no-data').remove();
        if (this.filtered_data.length === 0)
            this.svg
                .append('text')
                .classed('qo-no-data', true)
                .attr({
                    x: this.plot_width / 2,
                    y: this.plot_height / 2,
                    'text-anchor': 'middle'
                })
                .text('No queries selected.  Verify that no filter selections are in conflict.');
    }

    function onResize() {
        //Add filter functionality to legend.
        legendFilter.call(this); //Add y-tick-label tooltips.

        addYAxisTickTooltips.call(this); //Plot data by field when viewing data by form and user clicks y-axis tick label.

        addYAxisTickClick.call(this); //Annotate the number of hidden y-axis tick labels.

        annotateYAxisInfo.call(this); //Truncate tick labels to fit in left margin of chart.

        truncateYAxisTickLabels.call(this); //Hide bars that aren't in first N groups.

        hideBars.call(this); //Annotate number of queries.

        annotateNumberOfQueries.call(this); //Add bar click-ability.

        addBarClick.call(this); //Add bar deselection.

        addBarDeselection.call(this); //Add informational text to the chart canvas when filters are in conflict.

        addNoDataIndicator.call(this);
    }

    function onDestroy() {
        //Destroy listing.
        this.listing.destroy(); //Remove stylesheet.

        this.style.remove(); //Clear container, removing one child node at a time.

        var node = d3.select(this.element).node();

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    var chartCallbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDataTransform: onDataTransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    function applyVariableMetadata() {
        var _this = this;

        var variableMetadata = [
            {
                variable: this.chart.initialSettings.site_col,
                label: 'Site',
                description: 'Site name assigned in EDC system'
            },
            {
                variable: this.chart.initialSettings.id_col,
                label: 'Participant ID',
                description: 'Subject ID assigned in EDC system'
            },
            {
                variable: this.chart.initialSettings.visit_col,
                label: 'Folder OID',
                description: 'Folder OID as assigned by DM'
            },
            {
                variable: this.chart.initialSettings.visitDescription_col,
                label: 'Folder',
                description:
                    'Name of folder currently displayed in EDC system. If the folder was renamed (e.g. to append a date) this will be reflected here'
            },
            {
                variable: this.chart.initialSettings.form_col,
                label: 'Form OID',
                description: 'Form OID as assigned by DM'
            },
            {
                variable: this.chart.initialSettings.formDescription_col,
                label: 'Form',
                description:
                    'Name of the form currently displayed in EDC system. If the form was renamed (e.g. to append a date) this will be reflected here'
            },
            {
                variable: this.chart.initialSettings.field_col,
                label: 'Field',
                description: 'Field name as assigned by DM'
            },
            {
                variable: this.chart.initialSettings.fieldDescription_col,
                label: 'Field Label',
                description: 'Field label as assigned by DM'
            },
            {
                variable: this.chart.initialSettings.marking_group_col,
                label: 'Marking Group',
                description: 'Group opening the query. Options include: CRA, DM, Safety, System'
            },
            {
                variable: this.chart.initialSettings.open_by_col,
                label: 'Opened by',
                description: 'Entity opening the query (System or name of individual)'
            },
            {
                variable: this.chart.initialSettings.status_col,
                label: 'Query Status',
                description:
                    'Status of query in EDC system. Options include: Open, answered, closed, cancelled'
            },
            {
                variable: this.chart.initialSettings.open_date_col,
                label: 'Open Date',
                description: 'Date query was opened in the system'
            },
            {
                variable: this.chart.initialSettings.response_date_col,
                label: 'Response Date',
                description: 'Date query was responded to by the site'
            },
            {
                variable: this.chart.initialSettings.resolved_date_col,
                label: 'Resolution Date',
                description: 'Date query was closed'
            },
            {
                variable: this.chart.initialSettings.recency_col,
                label: 'Query Recency (days)',
                description:
                    'Number of days between query open date and data extraction date, regardless of query status.'
            },
            {
                variable: this.chart.initialSettings.recency_category_col,
                label: 'Query Recency',
                description:
                    'Number of days by category between query open date and data extraction date, regardless of query status. Categories include last 7, 14, and 30 days.'
            },
            {
                variable: 'queryrecency',
                label: 'Query Recency',
                description:
                    'Number of days by category between query open date and data extraction date, regardless of query status. Categories include last 7, 14, and 30 days.'
            },
            {
                variable: this.chart.initialSettings.age_col,
                label: 'Query Age (days)',
                description:
                    'Number of days between query open date and data extraction date, query response date, or query resolution date for open, answered, and closed/cancelled queries, respectively.'
            },
            {
                variable: 'queryage',
                label: 'Query Age',
                description:
                    'Number of days by category between query open date and data extraction date, query response date, or query resolution date for open, answered, and closed/cancelled queries, respectively.'
            },
            {
                variable: this.chart.initialSettings.query_col,
                label: 'Query',
                description: 'Text of query'
            },
            {
                variable: this.chart.initialSettings.query_response_col,
                label: 'Query Response',
                description: 'Site response to the query'
            }
        ];
        this.config.descriptions = [];
        this.config.cols.forEach(function(col, i) {
            var md = variableMetadata.find(function(variableMetadatum) {
                return variableMetadatum.variable === col;
            });
            _this.config.headers[i] = md ? md.label : col;

            _this.config.descriptions.push(md ? md.description : col);
        });
    }

    function onInit$1() {
        applyVariableMetadata.call(this);
    }

    function addResetButton$1() {
        var _this = this;

        this.resetButton = this.wrap
            .insert('button', ':first-child')
            .classed('qo-button qo-button--reset-listing', true)
            .text('Reset listing')
            .on('click', function() {
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

                _this.chart.listing.draw(_this.chart.filtered_data);
            });
    }

    function addTableContainer() {
        // Place the table inside of a div so that we can use a css trick
        // to place a horizontal scroll bar on top of the table in defineStyles.js
        var table = this.table.node();
        this.tableContainer = this.wrap
            .append('div')
            .classed('qo-table-container', true)
            .node();
        this.wrap.select('table').classed('qo-table', true); // I want to ensure that no other webcharts tables get flipped upside down

        table.parentNode.insertBefore(this.tableContainer, table);
        this.tableContainer.appendChild(table);
        this.tableContainer.scrollLeft = 9999;
    }

    function onLayout$1() {
        addResetButton$1.call(this);
        addTableContainer.call(this);
    }

    function onPreprocess$1() {}

    function addHeaderTooltips() {
        var _this = this;

        this.thead_cells.attr('title', function(d, i) {
            return _this.config.descriptions[i];
        });
    }

    function manualSort() {
        var _this = this;

        var context = this;
        this.data.manually_sorted = this.data.raw.sort(function(a, b) {
            var order = 0;

            _this.sortable.order.forEach(function(item) {
                var aCell = a[item.col];
                var bCell = b[item.col];

                if (
                    item.col !== context.chart.initialSettings.age_col &&
                    item.col !== context.chart.initialSettings.recency_col
                ) {
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

    function updateColumnSorting() {
        var context = this;

        if (this.config.sortable) {
            this.thead_cells.on('click', function(d) {
                var th = this;
                var header = d;
                var selection = d3.select(th);
                var col = context.config.cols[context.config.headers.indexOf(header)]; //Check if column is already a part of current sort order.

                var sortItem = context.sortable.order.filter(function(item) {
                    return item.col === col;
                })[0]; //If it isn't, add it to sort order.

                if (!sortItem) {
                    sortItem = {
                        col: col,
                        direction: 'ascending',
                        wrap: context.sortable.wrap
                            .append('div')
                            .datum({
                                key: col
                            })
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
                } //Hide sort instructions.

                context.sortable.wrap.select('.instruction').classed('hidden', true); //Add sort container deletion functionality.

                context.sortable.order.forEach(function(item, i) {
                    item.wrap.on('click', function(d) {
                        //Remove column's sort container.
                        d3.select(this).remove(); //Remove column from sort.

                        context.sortable.order.splice(
                            context.sortable.order
                                .map(function(d) {
                                    return d.col;
                                })
                                .indexOf(d.key),
                            1
                        ); //Display sorting instruction.

                        context.sortable.wrap
                            .select('.instruction')
                            .classed('hidden', context.sortable.order.length); //Redraw table.

                        manualSort.call(context);
                    });
                }); //Redraw table.

                manualSort.call(context);
            });
        }
    }

    function truncateCellText() {
        var _this = this;

        if (this.data.raw.length)
            this.tbody
                .selectAll('td')
                .attr('title', function(d) {
                    return d.text;
                })
                .filter(function(d) {
                    return d.text.length > _this.chart.initialSettings.truncation_cutoff;
                })
                .text(function(d) {
                    return ''.concat(
                        d.text.substring(0, _this.chart.initialSettings.truncation_cutoff),
                        '...'
                    );
                });
    }

    function moveScrollBarLeft() {
        var _this = this;

        this.tableContainer.scrollLeft = 9999;
        var scrollATadMore = setInterval(function() {
            return (_this.tableContainer.scrollLeft += 100);
        }, 10); // for whatever reason the table doesn't scroll all the way left so just give the webpage a 25 milliseconds to load and then nudge the scrollbar the rest of the way

        setTimeout(function() {
            return clearInterval(scrollATadMore);
        }, 10);
    }

    function onDraw$1() {
        //Add tooltips to column headers.
        addHeaderTooltips.call(this); //Update default Webcharts column sorting.

        updateColumnSorting.call(this); //Truncate cells with length greater than `settings.truncation_cutoff`.

        truncateCellText.call(this); //Move table scrollbar all the way to the left.

        moveScrollBarLeft.call(this);
    }

    function onDestroy$1() {}

    var listingCallbacks = {
        onInit: onInit$1,
        onLayout: onLayout$1,
        onPreprocess: onPreprocess$1,
        onDraw: onDraw$1,
        onDestroy: onDestroy$1
    };

    function queryOverview$1() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var dom = arguments.length > 2 ? arguments[2] : undefined;
        //Settings
        var mergedSettings = Object.assign({}, configuration.settings, settings);
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var syncedControlInputs = configuration.syncControlInputs(
            configuration.controlInputs,
            syncedSettings
        ); //Layout and styles

        var containers = layout(element);
        var style = styles(dom ? dom.window.document : document); //Controls

        var controls = webcharts.createControls(containers.controls.node(), {
            location: 'top',
            inputs: syncedControlInputs
        }); //Chart

        var chart = webcharts.createChart(containers.chart.node(), syncedSettings, controls);
        chart.element = element;
        chart.style = style;
        chart.initialSettings = clone(mergedSettings);

        for (var callback in chartCallbacks) {
            chart.on(callback.substring(2).toLowerCase(), chartCallbacks[callback]);
        } //Listing

        var listing = webcharts.createTable(containers.listing.node(), syncedSettings);
        listing.test = !!dom;

        for (var _callback in listingCallbacks) {
            listing.on(_callback.substring(2).toLowerCase(), listingCallbacks[_callback]);
        } //Intertwine

        chart.listing = listing;
        listing.chart = chart;
        return chart;
    }

    return queryOverview$1;
});
