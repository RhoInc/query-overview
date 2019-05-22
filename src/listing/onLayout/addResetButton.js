export default function addResetButton() {
    this.resetButton = this.wrap
        .insert('button', ':first-child')
        .classed('qo-button qo-button--reset-listing', true)
        .text('Reset listing')
        .on('click', () => {
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
            this.chart.listing.draw(this.chart.filtered_data);
        });
}
