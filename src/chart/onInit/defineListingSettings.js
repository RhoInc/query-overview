export default function defineListingSettings() {
    this.listing.config.cols = this.config.details
        ? this.config.details.map(d => d.value_col)
        : Object.keys(this.raw_data[0]).filter(
              key => ['Form: Field', this.config.recency_category_col].indexOf(key) < 0
          ); // remove derived variables (recency_category_col is captured in variable queryrecency, derived in ./defineNewVariables)
    this.listing.config.headers = this.config.details
        ? this.config.details.map(d => d.label)
        : Object.keys(this.raw_data[0]).filter(
              key => ['Form: Field', this.config.recency_category_col].indexOf(key) < 0
          );
}
