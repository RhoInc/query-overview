export default function defineListingSettings() {
    this.listing.config.cols = this.config.details
        ? this.config.details.map(d => d.value_col)
        : Object.keys(this.raw_data[0]).filter(key => key !== 'Form: Field');
    this.listing.config.headers = this.config.details
        ? this.config.details.map(d => d.label)
        : Object.keys(this.raw_data[0]).filter(key => key !== 'Form: Field');
}
