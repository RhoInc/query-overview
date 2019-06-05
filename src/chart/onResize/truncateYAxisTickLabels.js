export default function truncateYAxisTickLabels() {
    if (!this.test) {
        // node.getBBox() doesn't work in jsdom
        const context = this;
        const yAxisLabelHeight = this.svg
            .select('.y.axis .axis-title')
            .node()
            .getBBox().height;
        const yAxisTickLabelSpace = this.config.maxYAxisTickWidth - yAxisLabelHeight - 4;

        if (this.config.maxYAxisTickLabelLength > yAxisTickLabelSpace)
            this.svg.selectAll('.y.axis .tick text').each(function(d) {
                const textWidth = this.getBBox().width;

                if (textWidth > yAxisTickLabelSpace) {
                    const charWidth = textWidth / d.length;
                    const nChar = Math.floor(yAxisTickLabelSpace / charWidth);
                    this.textContent = d.substring(0, nChar - 3) + '...';
                }
            });
    }
}
