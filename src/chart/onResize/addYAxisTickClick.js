import updateSelectAll from '../onLayout/updateFilterEventListeners/updateSelectAll';

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
                .property('selected', d => {
                    return d === 'Form: Field';
                });
            this.config.y.column = 'Form: Field';
            this.config.y.label = 'Form: Field';
            this.config.marks[0].per[0] = 'Form: Field';
            this.controls.wrap
                .selectAll('.control-group')
                .filter(d => d.label === 'Form')
                .selectAll('option')
                .property('selected', d => d === yLabel);
            const filter = this.filters
                .find(filter => filter.col === this.config.form_col)
            filter.val = yLabel;
            updateSelectAll.call(
                this,
                this.controls.filters.controlGroups
                    .filter(d => d.value_col === this.config.form_col)
                    .datum(),
                [yLabel]
            );

            this.draw();
            this.listing.wrap.selectAll('*').remove();
            this.listing.init(this.filtered_data);
        });
    }
}
