export default function onResize() {
  var chart = this;

  //Hide bars that aren't in first N groups.
  this.svg
    .select("g.bar-supergroup")
    .selectAll("g.bar-group")
    .attr("display", function(d, i) {
      return chart.y_dom.indexOf(d.key) > -1 ? null : "none";
    });

  //Annotate # of Queries.
  this.svg.selectAll(".number-of-queries").remove();
  if (this.config.marks[0].arrange === "stacked") {
    this.current_data.forEach(d => {
      if (chart.y_dom.indexOf(d.key) > -1) {
        chart.svg
          .append("text")
          .classed("number-of-queries", true)
          .attr({
            x: chart.x(d.total),
            y: chart.y(d.key) + chart.y.rangeBand() / 2,
            dx: "0.25em",
            dy: "0.3em"
          })
          .style("font-size", "80%")
          .text(d.total);
      }
    });
  } else {
    this.current_data.forEach(d => {
      if (chart.y_dom.indexOf(d.key) > -1) {
        d.values.forEach(di => {
          chart.svg
            .append("text")
            .classed("number-of-queries", true)
            .attr({
              x: chart.x(di.values.x),
              y: chart.y(d.key) +
                chart.y.rangeBand() *
                  (3 - chart.config.status_order.indexOf(di.key)) /
                  4,
              dx: "0.25em",
              dy: "1em"
            })
            .style("font-size", "80%")
            .text(di.values.x);
        });
      }
    });
  }

  //Plot data by field when viewing data by form.
  if (this.config.y.column === this.config.form_col) {
    const yLabels = this.svg
      .selectAll(".y.axis .tick")
      .style("fill", "blue")
      .style("text-decoration", "underline");
    yLabels.style("cursor", "pointer").on("click", yLabel => {
      this.controls.wrap
        .selectAll(".control-group")
        .filter(d => d.label === "Group by")
        .selectAll("option")
        .property("selected", d => d === "Form: Field");
      this.config.y.column = "Form: Field";
      this.config.y.label = "Form: Field";
      this.config.marks[0].per[0] = "Form: Field";
      this.controls.wrap
        .selectAll(".control-group")
        .filter(d => d.label === "Form")
        .selectAll("option")
        .property("selected", d => d === yLabel);
      this.filters.filter(filter => filter.col === this.config.form_col)[0].val = yLabel;

      this.draw(
        this.filtered_data.filter(d => d[this.config.form_col] === yLabel)
      );
    });
  }

  //Add bar click-ability.
  const barGroups = this.svg.selectAll(".bar-group"),
    bars = this.svg.selectAll(".bar"),
    mouseoverStyle = {
      "stroke-width": "5px",
      fill: "black"
    },
    mouseoutStyle = {
      "stroke-width": "1px",
      fill: d => chart.colorScale(d.key)
    };
  bars
    .style("cursor", "pointer")
    .on("mouseover", function() {
      d3.select(this).style(mouseoverStyle).moveToFront();
    })
    .on("mouseout", function() {
      if (!d3.select(this).classed("selected"))
        d3.select(this).style(mouseoutStyle);
      bars
        .filter(function() {
          return d3.select(this).classed("selected");
        })
        .moveToFront();
    })
    .on("click", function(d) {
      bars.classed("selected", false).style(mouseoutStyle);
      d3.select(this).classed("selected", true).style(mouseoverStyle);
      chart.listing.draw(d.values.raw);
    });

  //Filter data by clicking on legend.
  const legendItems = this.wrap.selectAll(".legend-item").style({
    cursor: "pointer",
    "border-radius": "4px",
    padding: "5px",
    "padding-left": "8px"
  }), // legend items
    statusOptions = this.controls.wrap
      .selectAll(".control-group")
      .filter(d => d.label === "Status")
      .selectAll(".changer option"); // status filter options
  legendItems.selectAll(".legend-mark-text").remove(); // don't need 'em
  legendItems.on("click", function(d) {
    const legendItem = d3.select(this), // clicked legend item
      selected = !legendItem.classed("selected"); // selected boolean
    legendItem.classed("selected", selected); // toggle selected class
    const selectedLegendItems = legendItems
      .filter(function() {
        return d3.select(this).classed("selected");
      })
      .data()
      .map(d => d.label); // selected statuses
    legendItem.style({
      background: selected ? "lightgray" : "white"
    }); // set background of legend items corresponding to selected statuses to light gray
    statusOptions
      .property("selected", false)
      .filter(d => selectedLegendItems.indexOf(d) > -1)
      .property("selected", true); // set selected property of status options corresponding to selected statuses to true
    const filtered_data = chart.raw_data.filter(d => {
      let filtered = selectedLegendItems.indexOf(d[chart.config.status_col]) === -1;

      chart.filters
        .filter(filter => filter.col !== chart.config.status_col)
        .forEach(filter => {
          if (filtered === false && filter.val !== "All")
            filtered =
              d[filter.col] !== filter.val ||
              filter.val.indexOf(d[filter.col]) === -1;
        });

      return !filtered;
    }); // define filtered data
    chart.filters.filter(filter => filter.col === chart.config.status_col)[
      0
    ].val = selectedLegendItems; // update chart's status filter object
    chart.draw(filtered_data);
  });

  //Add y-tick-label tooltips.
  if (this.config.y.column === this.config.form_col)
    this.svg
      .selectAll(".y.axis .tick")
      .filter(form => this.y_dom.indexOf(form) > -1)
      .append("title")
      .text(
        form =>
          `Form: ${this.raw_data.filter(d => d[this.config.form_col] === form)[0][this.config.formDescription_col] || form}`
      );
  if (this.config.y.column === "Form: Field")
    this.svg
      .selectAll(".y.axis .tick")
      .style("cursor", "help")
      .filter(field => this.y_dom.indexOf(field) > -1)
      .append("title")
      .text(field => {
        const datum = this.raw_data.filter(d => d["Form: Field"] === field)[0];
        return `Form: ${datum[this.config.formDescription_col] || datum[this.config.form_col]}\nField: ${datum[this.config.fieldDescription_col] || datum[this.config.field_col]}`;
      });
}
