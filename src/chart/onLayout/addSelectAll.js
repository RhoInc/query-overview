export default function addSelectAll() {
    this.controls.filters.labels
        .each(function(d) {
            console.log(d);
            const label = d3.select(this)
                .html(`<input class = "qo-select-all" type = "checkbox"></input>${d.label}`);
            const checkbox = label
                .select('input')
                .attr('title', `Deselect All ${d.label} Options`)
                .property('checked', true)
                .on('click', function(di) {
                    const checkbox = d3.select(this);
                    const checked = this.checked;
                    checkbox.attr('title', (
                        checked
                            ? `Deselect All ${di.label} Options`
                            : `Select All ${di.label} Options`
                    ));
                    console.log(di);
                    console.log(checked);
                });
        });
}
