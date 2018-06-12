export default function highlightSelectedOptions() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group select')
        .filter(function() {
            return this.multiple;
        })
        .each(function(d) {
            const filter = context.filters
                .find(filter => filter.col === d.value_col);
            d3.select(this)
                .selectAll('option')
                .property('selected', di => filter.val === 'All' || filter.val.indexOf(di) > -1);
        });
}
