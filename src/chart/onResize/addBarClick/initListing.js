export default function initListing() {
    //Clear listing container.
    this.listing.wrap.selectAll('*').remove();

    //Capture data from selected bars.
    const selectedData = d3
        .selectAll('rect.selected')
        .data()
        .flatMap(d => d.values.raw);

    //Feed data from selected bars into listing.
    if (selectedData.length > 0) this.listing.init(selectedData);
    else this.listing.init(this.filtered_data);
}
