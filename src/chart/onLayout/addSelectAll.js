import updateFilter from './addSelectAll/updateFilter';

export default function addSelectAll() {
    const context = this;

    this.controls.filters.labels
        .filter(d => d.multiple) // only multi-selects
        .each(function(d) {
            //Add checkbox to filter label.
            const label = d3
                .select(this)
                .html(`${d.label} <input class = "qo-select-all" type = "checkbox"></input>`);

            //Add event listener to select-all checkbox.
            const checkbox = label
                .select('input')
                .datum(d)
                .attr('title', `Deselect all ${d.label} options`)
                .property('checked', true)
                .on('click', function(di) {
                    //Update filter dropdown.
                    updateFilter.call(context, di, this);
                });
        });

    //Attach checkboxes to filters object.
    this.controls.filters.checkboxes = this.controls.filters.labels.selectAll('.qo-select-all');
}
