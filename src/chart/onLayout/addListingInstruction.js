export default function addListingInstruction() {
    this.wrap
        .append('em')
        .attr('id', 'listing-instruction')
        .text('Click a bar to view its underlying data.');
}
