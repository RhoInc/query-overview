export default function removeInvalidControls() {
    const context = this;

    // if the variable for the filter or the variable used to derive the filter
    // are missing from that data -> remove them
    const updated_inputs = this.controls.config.inputs.filter(
        d =>
            d.derive_source
                ? d.derive_source in context.raw_data[0]
                : d.value_col ? d.value_col in context.raw_data[0] : true
    );

    this.controls.config.inputs = updated_inputs;
}
