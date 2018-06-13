export default function annotateNumberOfQueries() {
    const context = this;

    this.svg.selectAll('.number-of-queries').remove();
    if (this.config.marks[0].arrange === 'stacked') {
        this.current_data.forEach(d => {
            if (context.y_dom.indexOf(d.key) > -1) {
                context.svg
                    .append('text')
                    .classed('number-of-queries', true)
                    .attr({
                        x: context.x(d.total),
                        y: context.y(d.key) + context.y.rangeBand() / 2,
                        dx: '0.25em',
                        dy: '0.3em'
                    })
                    .style('font-size', '80%')
                    .text(d.total);
            }
        });
    } else {
        this.current_data.forEach(d => {
            if (context.y_dom.indexOf(d.key) > -1) {
                d.values.forEach(di => {
                    context.svg
                        .append('text')
                        .classed('number-of-queries', true)
                        .attr({
                            x: context.x(di.values.x),
                            y:
                                context.y(d.key) +
                                (context.y.rangeBand() *
                                    (context.config.color_dom.length -
                                        1 -
                                        context.config.color_dom.indexOf(di.key))) /
                                    context.config.color_dom.length,
                            dx: '0.25em',
                            dy: '1em'
                        })
                        .style('font-size', '80%')
                        .text(di.values.x);
                });
            }
        });
    }
}
