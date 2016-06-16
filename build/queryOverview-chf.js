(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('d3'), require('webcharts')) :
    typeof define === 'function' && define.amd ? define(['react', 'd3', 'webcharts'], factory) :
    (global.queryOverview = factory(global.React,global.d3,global.webCharts));
}(this, function (React,d3$1,webcharts) { 'use strict';

    React = 'default' in React ? React['default'] : React;

    function stringAccessor (o, s, v) {
        //adapted from http://jsfiddle.net/alnitak/hEsys/
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                if (i == n - 1 && v !== undefined) o[k] = v;
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    var binding = {
    	dataMappings: [
    	//Custom data mappings//
    	{
    		source: "form_col",
    		target: "form_col"
    	}, {
    		source: "field_col",
    		target: "field_col"
    	}, {
    		source: "status_col",
    		target: "status_col"
    	}, {
    		source: "filter_cols",
    		target: "filter_cols"
    	},
    	//Standard Webcharts settings//
    	{
    		source: "x",
    		target: "x.column"
    	}, {
    		source: "x_order",
    		target: "x.order"
    	}, {
    		source: "x_domain",
    		target: "x.domain"
    	}, {
    		source: "y",
    		target: "y.column"
    	}, {
    		source: "y_order",
    		target: "y.order"
    	}, {
    		source: "y_domain",
    		target: "y.domain"
    	}, {
    		source: "group",
    		target: "marks.0.per"
    	}, {
    		source: "subgroup",
    		target: "marks.0.split"
    	}, {
    		source: "subset",
    		target: "marks.0.values"
    	}, {
    		source: "group2",
    		target: "marks.1.per"
    	}, {
    		source: "subgroup2",
    		target: "marks.1.split"
    	}, {
    		source: "subset2",
    		target: "marks.1.values"
    	}, {
    		source: "color_by",
    		target: "color_by"
    	}, {
    		source: "legend_order",
    		target: "legend.order"
    	}, {
    		source: "tooltip",
    		target: "marks.0.tooltip"
    	}],
    	chartProperties: [
    	//Custom chart properties
    	{
    		source: "cutoff",
    		target: "cutoff"
    	}, {
    		source: "alphabetize",
    		target: "alphabetize"
    	}, {
    		source: "groupBy",
    		target: "groupBy"
    	}, {
    		source: "alphabetize",
    		target: "alphabetize"
    	},
    	//Standard webcharts chart properties
    	{
    		source: "date_format",
    		target: "date_format"
    	}, {
    		source: "x_label",
    		target: "x.label"
    	}, {
    		source: "x_type",
    		target: "x.type"
    	}, {
    		source: "x_format",
    		target: "x.format"
    	}, {
    		source: "x_sort",
    		target: "x.sort"
    	}, {
    		source: "x_bin",
    		target: "x.bin"
    	}, {
    		source: "x_behavior",
    		target: "x.behavior"
    	}, {
    		source: "y_label",
    		target: "y.label"
    	}, {
    		source: "y_type",
    		target: "y.type"
    	}, {
    		source: "y_format",
    		target: "y.format"
    	}, {
    		source: "y_sort",
    		target: "y.sort"
    	}, {
    		source: "y_bin",
    		target: "y.bin"
    	}, {
    		source: "y_behavior",
    		target: "y.behavior"
    	}, {
    		source: "marks_type",
    		target: "marks.0.type"
    	}, {
    		source: "marks_summarizeX",
    		target: "marks.0.summarizeX"
    	}, {
    		source: "marks_summarizeY",
    		target: "marks.0.summarizeY"
    	}, {
    		source: "marks_arrange",
    		target: "marks.0.arrange"
    	}, {
    		source: "marks_fill_opacity",
    		target: "marks.0.attributes.fill-opacity"
    	}, {
    		source: "marks_tooltip",
    		target: "marks.0.tooltip"
    	}, {
    		source: "marks_text",
    		target: "marks.0.text"
    	}, {
    		source: "marks2_type",
    		target: "marks.1.type"
    	}, {
    		source: "marks2_summarizeX",
    		target: "marks.1.summarizeX"
    	}, {
    		source: "marks2_summarizeY",
    		target: "marks.1.summarizeY"
    	}, {
    		source: "marks2_arrange",
    		target: "marks.1.arrange"
    	}, {
    		source: "marks2_fill_opacity",
    		target: "marks.1.attributes.fill-opacity"
    	}, {
    		source: "marks2_tooltip",
    		target: "marks.1.tooltip"
    	}, {
    		source: "marks2_text",
    		target: "marks.1.text"
    	}, {
    		source: "transitions",
    		target: "transitions"
    	}, {
    		source: "aspect_ratio",
    		target: "aspect"
    	}, {
    		source: "range_band",
    		target: "range_band"
    	}, {
    		source: "colors",
    		target: "colors"
    	}, {
    		source: "gridlines",
    		target: "gridlines"
    	}, {
    		source: "max_width",
    		target: "max_width"
    	}, {
    		source: "width",
    		target: "width"
    	}, {
    		source: "height",
    		target: "height"
    	}, {
    		source: "margin_top",
    		target: "margin.top"
    	}, {
    		source: "margin_bottom",
    		target: "margin.bottom"
    	}, {
    		source: "margin_left",
    		target: "margin.left"
    	}, {
    		source: "margin_right",
    		target: "margin.right"
    	}, {
    		source: "resizable",
    		target: "resizable"
    	}, {
    		source: "scale_text",
    		target: "scale_text"
    	}, {
    		source: "legend_mark",
    		target: "legend.mark"
    	}, {
    		source: "legend_label",
    		target: "legend.label"
    	}, {
    		source: "legend_location",
    		target: "legend.location"
    	}]
    };

    var settings = {
      //Addition settings for this template
      cutoff: 10,
      alphabetize: false,
      form_col: "form",
      field_col: "field",
      status_col: "status",
      filter_cols: ["markGroup", "site"],
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
    };

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

    function onDataTransform() {}

    function onDraw() {
      var chart = this;

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
      var chart = this;
      var textMarks = d3.select("g.text-supergroup").selectAll("text").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
      });
      var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group").attr("display", function (d, i) {
        return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
      });
    }

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

    function queryOverview(element, settings$$) {

    	//merge user's settings with defaults
    	var mergedSettings = Object.assign({}, settings, settings$$);

    	//keep settings in sync with the data mappings
    	mergedSettings = syncSettings(mergedSettings);

    	//keep control inputs in sync and create controls object
    	var syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
    	var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });

    	//create chart
    	var chart = webcharts.createChart(element, mergedSettings, controls);
    	chart.on('init', onInit);
    	chart.on('layout', onLayout);
    	chart.on('datatransform', onDataTransform);
    	chart.on('draw', onDraw);
    	chart.on('resize', onResize);

    	return chart;
    }

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var ReactYourProjectName = function (_React$Component) {
    	inherits(ReactYourProjectName, _React$Component);

    	function ReactYourProjectName(props) {
    		classCallCheck(this, ReactYourProjectName);

    		var _this = possibleConstructorReturn(this, Object.getPrototypeOf(ReactYourProjectName).call(this, props));

    		_this.state = {};
    		return _this;
    	}

    	createClass(ReactYourProjectName, [{
    		key: 'componentDidMount',
    		value: function componentDidMount(prevProps, prevState) {
    			if (this.props.data.length) {
    				//manually clear div and redraw
    				d3$1.select('.chart-div.id-' + this.props.id).selectAll('*').remove();
    				var chart = queryOverview('.chart-div.id-' + this.props.id, this.props.settings).init(this.props.data);
    			}
    		}
    	}, {
    		key: 'componentDidUpdate',
    		value: function componentDidUpdate(prevProps, prevState) {
    			if (this.props.data.length) {
    				//manually clear div and redraw
    				d3$1.select('.chart-div.id-' + this.props.id).selectAll('*').remove();
    				var chart = queryOverview('.chart-div.id-' + this.props.id, this.props.settings).init(this.props.data);
    			}
    		}
    	}, {
    		key: 'render',
    		value: function render() {
    			return React.createElement('div', {
    				key: this.props.id,
    				className: 'chart-div id-' + this.props.id + ' ' + (!this.props.data.length ? 'loading' : ''),
    				style: { minHeight: '1px', minWidth: '1px' }
    			});
    		}
    	}]);
    	return ReactYourProjectName;
    }(React.Component);

    ReactYourProjectName.defaultProps = { data: [], controlInputs: [], id: 'id' };

    function describeCode(props) {
      var settings = this.createSettings(props);
      var code = '// uses d3 v.' + d3$1.version + '\n// uses webcharts v.' + webcharts.version + '\n// uses query-overview v.0.1.3\n\nvar settings = ' + JSON.stringify(settings, null, 2) + ';\n\nvar myChart = queryOverview(dataElement, settings);\n\nd3.csv(dataPath, function(error, csv) {\n  myChart.init(csv);\n});\n';
      return code;
    }

    var Renderer = function (_React$Component) {
      inherits(Renderer, _React$Component);

      function Renderer(props) {
        classCallCheck(this, Renderer);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Renderer).call(this, props));

        _this.binding = binding;
        _this.describeCode = describeCode.bind(_this);
        _this.state = { data: [], settings: {}, template: {}, loadMsg: 'Loading...' };
        return _this;
      }

      createClass(Renderer, [{
        key: 'createSettings',
        value: function createSettings(props) {
          // set placeholders for anything the user can change
          var shell = settings;

          binding.dataMappings.forEach(function (e) {
            var chartVal = stringAccessor(props.dataMappings, e.source);
            if (chartVal) {
              stringAccessor(shell, e.target, chartVal);
            } else {
              var defaultVal = stringAccessor(props.template.dataMappings, e.source + '.default');
              if (defaultVal && typeof defaultVal === 'string' && defaultVal.slice(0, 3) === 'dm$') {
                var pointerVal = stringAccessor(props.dataMappings, defaultVal.slice(3)) || null;
                stringAccessor(shell, e.target, pointerVal);
              } else if (defaultVal) {
                stringAccessor(shell, e.target, defaultVal);
              }
            }
          });
          binding.chartProperties.forEach(function (e) {
            var chartVal = stringAccessor(props.chartProperties, e.source);
            if (chartVal !== undefined) {
              stringAccessor(shell, e.target, chartVal);
            } else {
              var defaultVal = stringAccessor(props.template.chartProperties, e.source + '.default');
              stringAccessor(shell, e.target, defaultVal);
            }
          });

          return syncSettings(shell);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          var settings = this.createSettings(this.props);
          this.setState({ settings: settings });
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var settings = this.createSettings(nextProps);
          this.setState({ settings: settings });
        }
      }, {
        key: 'render',
        value: function render() {
          return React.createElement(ReactYourProjectName, {
            id: this.props.id,
            settings: this.state.settings,
            controlInputs: this.props.template.controls,
            data: this.props.data
          });
        }
      }]);
      return Renderer;
    }(React.Component);

    return Renderer;

}));