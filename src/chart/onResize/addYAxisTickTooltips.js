export default function addYAxisTickTooltips() {
    if (this.config.y.column === this.config.form_col)
        this.svg
            .selectAll('.y.axis .tick')
            .filter(form => this.y_dom.indexOf(form) > -1)
            .append('title')
            .text(
                form =>
                    `Form: ${this.raw_data.filter(d => d[this.config.form_col] === form)[0][
                        this.config.formDescription_col
                    ] || form}`
            );
    if (this.config.y.column === 'Form: Field')
        this.svg
            .selectAll('.y.axis .tick')
            .style('cursor', 'help')
            .filter(field => this.y_dom.indexOf(field) > -1)
            .append('title')
            .text(field => {
                const datum = this.raw_data.filter(d => d['Form: Field'] === field)[0];
                return `Form: ${datum[this.config.formDescription_col] ||
                    datum[this.config.form_col]}\nField: ${datum[
                    this.config.fieldDescription_col
                ] || datum[this.config.field_col]}`;
            });
}
