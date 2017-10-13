export default function onDraw() {
    const listing = this;

    this.chart.wrap.select('#listing-instruction').style('display', 'none');
    this.wrap
        .insert('button', ':first-child')
        .attr('id', 'clear-listing')
        .style({
            margin: '5px',
            padding: '5px',
            float: 'right'
        })
        .text('Clear listing')
        .on('click', () => {
            this.wrap.selectAll('*').remove();
            this.chart.svg.selectAll('.bar').style({
                'stroke-width': '1px',
                fill: d => this.chart.colorScale(d.key)
            });
            this.chart.wrap.select('#listing-instruction').style('display', 'block');
        });
}
