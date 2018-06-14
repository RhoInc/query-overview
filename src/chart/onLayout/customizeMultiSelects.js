export default function customizeMultiSelects() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group select')
        .filter(function() {
            return this.multiple;
        })
        .property('size', function() {
            return Math.min(context.config.dropdown_size, this.querySelectorAll('option').length);
        })
        .style('overflow-y', function() {
            return this.size < this.querySelectorAll('option').length ? 'scroll' : 'hidden';
        })
        .each(function(d) {
            const filter = context.filters.find(filter => filter.col === d.value_col);
            d3
                .select(this)
                .selectAll('option')
                .sort(
                    (a, b) => (d.order ? d.order.indexOf(a) - d.order.indexOf(b) : a < b ? -1 : 1)
                );
        });
}
