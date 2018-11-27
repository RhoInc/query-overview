export default function updateSelectAll(d, selectedOptions) {
    //Update filter object.
    const filter = this.filters.find(filter => filter.col === d.value_col);
    filter.val = selectedOptions;
    const checked = filter.val.length === filter.choices.length;

    //Update checkbox.
    const checkbox = this.controls.filters.checkboxes
        .filter(di => di.value_col === d.value_col)
        .attr(
            'title',
            checked ? `Deselect All ${d.label} Options` : `Select All ${d.label} Options`
        )
        .property('checked', checked);
}