export default function updateSelectAll(d, selectedOptions) {
    //Update filter object.
    const filter = this.filters.find(filter => filter.col === d.value_col);
    filter.val = d.multiple ? selectedOptions : selectedOptions.pop();

    //Update checkbox.
    if (d.multiple) {
        const checked = filter.val.length === filter.choices.length;
        const checkbox = this.controls.filters.checkboxes
            .filter(di => di.value_col === d.value_col)
            .attr(
                'title',
                checked ? `Deselect all ${d.label} options` : `Select all ${d.label} options`
            )
            .property('checked', checked);
    }
}
