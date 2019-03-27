import syncQueryAgeAndStatus from './syncQueryAgeAndStatus';

export default function updateFilter(d, element, draw = true) {
    const checkbox = d3.select(element);
    const checked = element.checked;

    //Update checkbox tooltip.
    checkbox.attr(
        'title',
        checked ? `Deselect all ${d.label} options` : `Select all ${d.label} options`
    );

    //Update filter object.
    const filter = this.filters.find(filter => filter.col === d.value_col);
    if (checked) filter.val = filter.choices;
    else filter.val = [];

    //Sync query age and status filters.
    syncQueryAgeAndStatus.call(this, d, checked);

    //Redraw.
    this.draw();
}
