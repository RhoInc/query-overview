export default function onInit() {
    const context = this;

    //Define detail listing settings.
    this.listing.config.cols = this.config.details
        ? this.config.details.map(d => d.value_col)
        : Object.keys(this.raw_data[0]).filter(key => key !== 'Form: Field');
    this.listing.config.headers = this.config.details
        ? this.config.details.map(d => d.label)
        : Object.keys(this.raw_data[0]).filter(key => key !== 'Form: Field');

    //Define new variables.
    this.raw_data.forEach(function(d) {
        d['Form: Field'] = d[context.config.form_col] + ': ' + d[context.config.field_col];
    });
}
