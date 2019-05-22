export default function resetListing() {
    //Capture data from selected bars.
    const selectedData = this.svg
        .selectAll('rect.selected')
        .data()
        .flatMap(d => d.values.raw);

    this.listing.draw(selectedData.length > 0 ? selectedData : this.filtered_data);
}
