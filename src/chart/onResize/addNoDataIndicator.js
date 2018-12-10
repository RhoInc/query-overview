export default function addNoDataIndicator() {
    this.svg.select('.qo-no-data').remove();
    console.log(this.filtered_data);
    if (this.filtered_data.length === 0)
        this.svg
            .append('text')
            .classed('qo-no-data', true)
            .attr({
                x: this.plot_width / 2,
                y: this.plot_height / 2,
                'text-anchor': 'middle'
            })
            .text('No queries selected.  Verify that no filter selections are in conflict.');
}
