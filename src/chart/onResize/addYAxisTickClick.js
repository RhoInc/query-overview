export default function addYAxisTickClick() {
    if (this.config.y.column === this.config.form_col) {
        const yLabels = this.svg
            .selectAll('.y.axis .tick')
            .style('fill', 'blue')
            .style('text-decoration', 'underline');
        yLabels.style('cursor', 'pointer').on('click', yLabel => {
            this.controls.wrap
                .selectAll('.control-group')
                .filter(d => d.label === 'Group by')
                .selectAll('option')
                .property('selected', d => d === 'Form: Field');
            this.config.y.column = 'Form: Field';
            this.config.y.label = 'Form: Field';
            this.config.marks[0].per[0] = 'Form: Field';
            this.controls.wrap
                .selectAll('.control-group')
                .filter(d => d.label === 'Form')
                .selectAll('option')
                .property('selected', d => d === yLabel);
            this.filters.filter(filter => filter.col === this.config.form_col)[0].val = yLabel;

            this.draw(this.filtered_data.filter(d => d[this.config.form_col] === yLabel));
            this.listing.wrap.selectAll('*').remove();
            this.wrap.select('listing-instruction').style('display', 'block');
            this.listing.init(this.filtered_data);
        });
    }
}
