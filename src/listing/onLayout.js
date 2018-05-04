export default function onLayout() {
    const context = this;

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
            this.chart.svg
                .selectAll('.bar')
                .classed('selected', false)
                .style({
                    'stroke-width': '1px',
                    fill: d => this.chart.colorScale(d.key)
                });
            context.chart.listing.init(context.chart.filtered_data);
            this.chart.wrap.select('#listing-instruction').style('display', 'block');
        });
    this.table.style('width', '100%').style('display', 'table');
}
