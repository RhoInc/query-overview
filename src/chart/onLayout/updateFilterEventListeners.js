export default function updateFilterEventListeners() {
    const context = this;

    this.controls.filters.selects.on('change', function(d) {
        const select = d3.select(this);
        const selectedOptions = select.selectAll('option:checked').data();

        //Update filter object.
        const filter = context.filters.find(filter => filter.col === d.value_col);
        filter.val = selectedOptions;
        const checked = filter.val.length === filter.choices.length;

        //Update checkbox.
        const checkbox = context.controls.filters.checkboxes
            .filter(di => di.value_col === d.value_col)
            .attr(
                'title',
                checked ? `Deselect All ${d.label} Options` : `Select All ${d.label} Options`
            )
            .property('checked', checked);

        //Redraw.
        context.draw();
    });
}
