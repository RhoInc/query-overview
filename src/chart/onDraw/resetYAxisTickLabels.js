export default function resetYAxisTickLabels() {
    this.svg.selectAll('.y.axis .tick').remove();
}
