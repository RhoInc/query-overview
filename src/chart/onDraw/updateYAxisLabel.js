export default function updateXAxisLabel() {
    // Make sure that the Y axis Label is tucked safely beneath reset chart button
    this.svg
        .select('.y.axis')
        .select('.axis-title')
        .attr('transform', 'translate(15,0)rotate(-90)');
}
