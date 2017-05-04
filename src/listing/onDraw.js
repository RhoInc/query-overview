export default function onDraw() {
  const listing = this;

  if (this.current_data.length) {
    this.wrap.select("#listing-instruction").remove();
    this.wrap.select("#clear-listing").remove();
    this.wrap
      .insert("button", ":first-child")
      .attr("id", "clear-listing")
      .style({
        margin: "5px",
        padding: "5px",
        float: "right"
      })
      .text("Clear listing")
      .on("click", () => {
        this.draw([]);
        this.chart.svg.selectAll(".bar").style({
          "stroke-width": "1px",
          fill: d => this.chart.colorScale(d.key)
        });
      });
    this.wrap
      .insert("em", ":first-child")
      .attr("id", "listing-instruction")
      .text(
        `${this.current_data[0].values.length} records are displayed below.`
      );
  } else {
    this.wrap.select("#listing-instruction").remove();
    this.wrap.select("#clear-listing").remove();
    this.wrap
      .insert("em", ":first-child")
      .attr("id", "listing-instruction")
      .text("Click a bar to view its underlying data.");
  }

  /**-------------------------------------------------------------------------------------------\
      Listing aesthetics
    \-------------------------------------------------------------------------------------------**/

  //Table
  this.table.attr({ width: "100%" }).style({ "border-collapse": "collapse" });
  //Header
  this.table
    .select("thead tr")
    .style({ "border-bottom": "1px solid black" })
    .selectAll("th")
    .style({
      "text-align": "left",
      padding: "5px"
    });
  //Body
  this.table
    .selectAll("tbody tr")
    .style({ background: (d, i) => (i % 2 ? "#eee" : "white") })
    .selectAll("td")
    .style({
      "text-align": "left",
      padding: "3px 5px"
    });
}
