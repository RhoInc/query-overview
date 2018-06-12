export default function defineQueryStatuses() {
    const queryStatusInput = this.controls.config.inputs
        .find(input => input.value_col === this.config.status_col);
    const queryStatusGroup = this.config.status_groups
        .find(status_group => status_group.value_col === this.config.status_col);
    const queryStatusOrder = Array.isArray(queryStatusGroup.order)
        ? queryStatusGroup.order.concat(
            d3.set(this.raw_data.map(d => d[this.config.status_col]))
                .values()
                .filter(value => queryStatusGroup.order.indexOf(value) < 0)
                .sort()
        )
        : d3.set(this.raw_data.map(d => d[this.config.status_col]))
            .values()
            .sort();
    queryStatusInput.order = queryStatusOrder;
    queryStatusGroup.order = queryStatusOrder;
}
