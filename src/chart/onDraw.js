export default function onDraw() {
  var chart = this;

  //Sort summarized data by descending total.
  this.current_data.sort(function(a, b) {
    return b.total < a.total
      ? -1
      : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
  });

  //Sort y-domain by descending total.
  this.y_dom.sort(function(a, b) {
    var order = chart.current_data.map(function(d) {
      return d.key;
    });
    return order.indexOf(b) < order.indexOf(a)
      ? -1
      : order.indexOf(b) > order.indexOf(a)
          ? 1
          : order.indexOf(b) >= order.indexOf(a) ? 0 : NaN;
  });

  //Limit y-domain to key values in summarized data.
  this.y_dom = this.y_dom.filter(function(d, i) {
    return (
      chart.current_data
        .map(function(d) {
          return d.key;
        })
        .indexOf(d) > -1
    );
  });

  //Limit y-domain to first [chart.config.cutoff] values.
  this.y_dom = this.y_dom.filter(function(d, i) {
    return i >= chart.y_dom.length - chart.config.cutoff;
  });

  this.y_dom = this.config.alphabetize
    ? this.y_dom.sort(d3.descending)
    : this.y_dom;

  //change chart height to match the current number of bars displayed
  this.raw_height =
    (+this.config.range_band + this.config.range_band * this.config.padding) *
    this.y_dom.length;

  //Reset listing.
  this.listing.draw([]);
  this.svg.selectAll(".bar").classed("selected", false).style({
    "stroke-width": "1px",
    fill: d => this.colorScale(d.key)
  });
}