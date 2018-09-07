export default function removeInvalidControls() {
    const context = this;

    // if the variable for the filter or the variable used to derive the filter
    // are missing from that data -> remove them
    this.controls.wrap
        .selectAll('.control-group')
        .filter(
            d =>
                d.derive_source
                    ? !(d.derive_source in context.raw_data[0])
                    : d.value_col ? !(d.value_col in context.raw_data[0]) : false
        )
        .remove();
}
