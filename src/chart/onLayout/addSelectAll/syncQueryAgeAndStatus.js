export default function syncQueryAgeAndStatus(d, checked) {
    const checkbox =
        d.label === 'Query Age'
            ? this.controls.filters.checkboxes.filter(di => di.label === 'Query Status')
            : this.controls.filters.checkboxes.filter(di => di.label === 'Query Age');
    checkbox.property('checked', checked);
    const datum = checkbox.datum();

    //Update checkbox tooltip.
    checkbox.attr(
        'title',
        checked ? `Deselect all ${datum.label} options` : `Select all ${datum.label} options`
    );

    //Update filter object.
    const filter = this.filters.find(filter => filter.col === datum.value_col);
    if (checked) filter.val = filter.choices;
    else filter.val = [];
}
