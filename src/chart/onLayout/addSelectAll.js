export default function addSelectAll() {
    const context = this;

    this.controls.filters.labels.each(function(d) {
        const label = d3
            .select(this)
            .html(`${d.label} <input class = "qo-select-all" type = "checkbox"></input>`);
        const checkbox = label
            .select('input')
            .datum(d)
            .attr('title', `Deselect All ${d.label} Options`)
            .property('checked', true)
            .on('click', function(di) {
                const checkbox = d3.select(this);
                const checked = this.checked;

                //Update checkbox tooltip.
                checkbox.attr(
                    'title',
                    checked ? `Deselect All ${di.label} Options` : `Select All ${di.label} Options`
                );

                //Update filter object.
                const filter = context.filters.find(filter => filter.col === di.value_col);
                if (checked) filter.val = filter.choices;
                else filter.val = [];

                //Redraw.
                context.draw();
            });
    });
    this.controls.filters.checkboxes = this.controls.filters.labels.selectAll('.qo-select-all');
}
