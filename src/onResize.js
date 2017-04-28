export default function onResize() {
    var chart = this;
    var textMarks = d3.select("g.text-supergroup").selectAll("text")
        .attr("display",function(d,i){
            return chart.y_dom.indexOf(d.key)>-1 ? null : "none";
        });
    var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group")
        .attr("display",function(d,i){return chart.y_dom.indexOf(d.key) >-1 ? null : "none" });

/*------------------------------------------------------------------------------------------------\
  Update this section to reference 'Form' and 'Field' instead of `this.config.form_col` and
  'FormField' after merging https://github.com/RhoInc/query-overview/pull/11.
\------------------------------------------------------------------------------------------------*/

  //Plot data by field when viewing data by form.
    if (this.config.y.column === this.config.form_col) {
        const yLabels = this.svg.selectAll('.y.axis .tick');
        yLabels
            .style('cursor', 'pointer')
            .on('click', yLabel => {
                this.config.y.column = 'FormField';
                this.config.marks[0].per[0] = 'FormField';
                this.config.marks[1].per[0] = 'FormField';
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => /^Form/.test(d.label))
                    .selectAll('option')
                    .filter(d => d === yLabel)
                    .property('selected', true);
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => /^Group/.test(d.label))
                    .selectAll('option')
                    .filter(d => d === 'FormField')
                    .property('selected', true);
                this.draw(this.filtered_data
                    .filter(d => d[this.config.form_col] === yLabel));
            });
    }
}
