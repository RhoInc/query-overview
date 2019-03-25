export default function addSelectAll() {
    const context = this;

    this.controls.filters.labels.filter(d => d.multiple).each(function(d) {
        const label = d3
            .select(this)
            .html(`${d.label} <input class = "qo-select-all" type = "checkbox"></input>`);
        const checkbox = label
            .select('input')
            .datum(d)
            .classed(`qo-select-all--${d.label.toLowerCase().replace(/ /g, '-')}`, true)
            .attr('title', `Deselect all ${d.label} options`)
            .property('checked', true)
            .on('click', function(di) {
                const checkbox = d3.select(this);
                const checked = this.checked;

                //Update checkbox tooltip.
                checkbox.attr(
                    'title',
                    checked ? `Deselect all ${di.label} options` : `Select all ${di.label} options`
                );

                //Update filter object.
                const filter = context.filters.find(filter => filter.col === di.value_col);
                if (checked) filter.val = filter.choices;
                else filter.val = [];

                //Sync query age and query status filters.
                if (['queryage', context.config.status_col].indexOf(di.value_col) > -1) {
                    //Update other checkbox.
                    const otherClass = di.value_col === 'queryage' ? 'query-status' : 'query-age';
                    const otherCheckbox = context.controls.filters.labels.selectAll(
                        `.qo-select-all--${otherClass}`
                    );
                    const otherDatum = otherCheckbox.datum();
                    console.log(otherDatum);
                    otherCheckbox
                        .attr(
                            'title',
                            checked
                                ? `Deselect all ${otherDatum.label} options`
                                : `Select all ${otherDatum.label} options`
                        )
                        .property('checked', checked);

                    //Update other filter.
                    const otherVariable =
                        di.value_col === 'queryage' ? context.config.status_col : 'queryage';
                    const otherFilter = context.filters.find(
                        filter => filter.col === otherVariable
                    );
                    if (checked) otherFilter.val = otherFilter.choices;
                    else otherFilter.val = [];
                }

                //Redraw.
                context.draw();
            });
    });
    this.controls.filters.checkboxes = this.controls.filters.labels.selectAll('.qo-select-all');
}
