export default function addYAxisTickTooltips() {
    const yAxisTicks = this.svg
        .selectAll('.y.axis .tick')
        .filter(form => this.y_dom.indexOf(form) > -1)
        .style('cursor', 'default');

    switch (this.config.y.column) {
        case this.config.form_col:
            yAxisTicks
                .append('title')
                .text(
                    form =>
                        `Form: ${this.raw_data.filter(d => d[this.config.form_col] === form)[0][
                            this.config.formDescription_col
                        ] || form}`
                );
            break;
        case 'Form: Field':
            yAxisTicks
                .style('cursor', 'help')
                .append('title')
                .text(field => {
                    const datum = this.raw_data.filter(d => d['Form: Field'] === field)[0];
                    return `Form: ${datum[this.config.formDescription_col] ||
                        datum[this.config.form_col]}\nField: ${datum[
                        this.config.fieldDescription_col
                    ] || datum[this.config.field_col]}`;
                });
            break;
        default:
            yAxisTicks.append('title').text(d => d);
    }
}
