export default function defineNewVariables() {
    this.raw_data.forEach(d => {
        d['Form: Field'] = d[this.config.form_col] + ': ' + d[this.config.field_col];
    });
}
