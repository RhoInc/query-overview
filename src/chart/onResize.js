export default function onResize() {
    var chart = this;

  //Hide bars that aren't in first N groups.
    this.svg.select("g.bar-supergroup").selectAll("g.bar-group")
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

  //Plot data by field when viewing data by form.
    if (this.config.y.column === 'Form') {
        const yLabels = this.svg.selectAll('.y.axis .tick');
        yLabels
            .style('cursor', 'pointer')
            .on('click', yLabel => {
                this.config.y.column = 'Field';
                this.config.marks[0].per[0] = 'Field';
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => d.label === 'Form')
                    .selectAll('option')
                    .filter(d => d === yLabel)
                    .property('selected', true);
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => d.label === 'Group by')
                    .selectAll('option')
                    .filter(d => d === 'Field')
                    .property('selected', true);
                this.filters
                    .filter(filter => filter.col === 'Form')[0]
                    .val = yLabel;
                this.draw(this.filtered_data
                    .filter(d => d[this.config.form_col] === yLabel));
            });
    }

  //Add bar click-ability.
    const
        barGroups = this.svg
            .selectAll('.bar-group'),
        bars = this.svg
            .selectAll('.bar'),
        mouseoverStyle =
            {'stroke-width': '5px'
            ,'fill': 'black'},
        mouseoutStyle =
            {'stroke-width': '1px'
            ,'fill': d => chart.colorScale(d.key)};
    bars.style('cursor', 'pointer')
        .on('mouseover', function() {
            d3.select(this)
                .style(mouseoverStyle)
                .moveToFront();
        })
        .on('mouseout', function() {
            if (!d3.select(this).classed('selected'))
                d3.select(this)
                    .style(mouseoutStyle);
            bars.filter(function() {
                    return d3.select(this).classed('selected'); })
                .moveToFront();
        })
        .on('click', function(d) {
            bars.classed('selected', false)
                .style(mouseoutStyle);
            d3.select(this)
                .classed('selected', true)
                .style(mouseoverStyle);
            chart.listing.draw(d.values.raw);
        });
}
