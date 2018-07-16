export default function resetListing() {
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
        .on('click', () => {
            this.wrap.selectAll('*').remove();
            // revert selected bars back to regular width and start
            this.chart.svg.selectAll('.bar.selected').attr({
                width: function(d) {
                    return this.getBBox().width + 2.5;
                },
                x: function(d) {
                    return this.getBBox().x - 2.5;
                }
            });
            this.chart.svg
                .selectAll('.bar')
                .classed('selected', false)
                .style({
                    'stroke-width': '1px',
                    fill: d => this.chart.colorScale(d.key)
                });
            this.chart.listing.init(this.chart.filtered_data);
            this.chart.wrap.select('#listing-instruction').style('display', 'block');
        });
}
