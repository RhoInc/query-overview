export default function onResize() {
    var chart = this;

  //Hide bars that aren't in first N groups.
    var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group")
        .attr("display",function(d,i){return chart.y_dom.indexOf(d.key) >-1 ? null : "none" });

  //Annotate # of Queries.
    this.svg.selectAll('.number-of-queries').remove();
    if (this.config.marks[0].arrange === 'stacked')
        this.svg
            .selectAll('.bar-group')
            .each(function(d) {
                if (chart.y_dom.indexOf(d.key) > -1)
                    d3.select(this)
                        .append('text')
                        .classed('number-of-queries', true)
                        .attr(
                            {x: chart.x(d.total)
                            ,y: chart.y(d.key)
                                + chart.y.rangeBand()/2
                            ,dx: '0.25em'
                            ,dy: '0.3em'})
                        .style('font-size', '80%')
                        .text(d.total);
            });
    else
        this.svg
            .selectAll('.bar-group')
            .each(function(d) {
                const barGroup = d3.select(this);
                barGroup
                    .selectAll('.bar')
                    .each((di,i) => {
                        if (chart.y_dom.indexOf(di.values.y) > -1)
                            barGroup
                                .append('text')
                                .classed('number-of-queries', true)
                                .attr(
                                    {x: chart.x(di.values.x)
                                    ,y: chart.y(di.values.y)
                                        + chart.y.rangeBand()*i/4
                                    ,dx: '0.25em'
                                    ,dy: '1em'})
                                .style('font-size', '80%')
                                .text(di.values.x);
                    });
            });
}
