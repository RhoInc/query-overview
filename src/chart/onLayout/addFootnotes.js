export default function addFootnotes() {
    this.footnotes = {
        barClick: this.wrap
            .append('div')
            .classed('qo-footnote qo-footnote--bar-click', true)
            .text('Click one or more bars to view the underlying data in the listing below.'),
        deselectBars: this.wrap
            .append('div')
            .classed('qo-footnote qo-footnote--deselect-bars', true)
            .text('Click in the white area to deselect all bars.')
    };
}
