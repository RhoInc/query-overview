export default function annotateYAxisInfo() {
    this.svg.select('#y-axis-info').remove();

    if (this.y_dom.length < this.y_dom_length) {
        this.svg
            .append('text')
            .attr({
                id: 'y-axis-info',
                x: 0,
                dx: -10,
                y: this.plot_height,
                dy: 15,
                'text-anchor': 'end'
            })
            .style('cursor', 'help')
            .text(`and ${this.y_dom_length - this.y_dom.length} more`)
            .on('mouseover', () => {
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => d.option === 'cutoff')
                    .style('background', 'lightgray');
            })
            .on('mouseout', () => {
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => d.option === 'cutoff')
                    .style('background', null);
            })
            .append('title')
            .text(
                `The number of ${this.config.y.label.toLowerCase()}s can be changed with the Show First N Groups radio buttons.`
            );
    }
}
