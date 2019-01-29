import updateSelectAll from '../onLayout/updateFilterEventListeners/updateSelectAll';

export default function addYAxisTickClick() {
    if (this.config.y.column === this.config.form_col) {
        const yLabels = this.svg
            .selectAll('.y.axis .tick')
            .style('fill', 'blue')
            .style('text-decoration', 'underline');
        yLabels.style('cursor', 'pointer').on('click', yLabel => {
            //Update Group by control.
            const groupByControl = this.controls.otherControls.controlGroups.filter(
                d => d.label === 'Group by'
            );
            groupByControl
                .select('.wc-control-label')
                .style({
                    'font-weight': 'bold',
                    'text-decoration': 'underline',
                    color: 'red'
                })
                .transition()
                .delay(3000)
                .style({
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    color: 'black'
                });
            groupByControl.selectAll('option').property('selected', d => {
                return d === 'Form: Field';
            });

            //Update chart settings.
            this.config.y.column = 'Form: Field';
            this.config.y.label = 'Form: Field';
            this.config.marks[0].per[0] = 'Form: Field';

            //Update Form filter.
            const formFilter = this.controls.filters.controlGroups.filter(d => d.label === 'Form');
            formFilter
                .select('.wc-control-label')
                .style({
                    'font-weight': 'bold',
                    'text-decoration': 'underline',
                    color: 'red'
                })
                .transition()
                .delay(3000)
                .style({
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    color: 'black'
                });
            formFilter.selectAll('option').property('selected', d => d === yLabel);

            //Update Form filter object in `chart.filters`.
            const filter = this.filters.find(filter => filter.col === this.config.form_col);
            filter.val = yLabel;
            updateSelectAll.call(
                this,
                this.controls.filters.controlGroups
                    .filter(d => d.value_col === this.config.form_col)
                    .datum(),
                [yLabel]
            );

            //Redraw chart and listing.

            //Update Group by control.
            this.draw();
            this.listing.wrap.selectAll('*').remove();
            this.listing.init(this.filtered_data);

            //Highlight y-axis label.
            this.svg
                .select('.y.axis .axis-title')
                .style({
                    'font-weight': 'bold',
                    'text-decoration': 'underline',
                    fill: 'red'
                })
                .transition()
                .delay(3000)
                .style({
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    fill: 'black'
                });
        });
    }
}
