export default function addBarClickFootnote() {
    this.footnotes = {
        barClick: this.wrap
            .append('div')
            .classed('qo-footnote qo-footnote--bar-click', true)
            .text('Click one or more bars to view the underlying data in the listing below.')
    };
}
