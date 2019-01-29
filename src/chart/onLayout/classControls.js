export default function classControls() {
    this.controls.controlGroups = this.controls.wrap
        .selectAll('.control-group')
        .attr(
            'class',
            d =>
                `control-group qo-${d.type} qo-${d.type}--${d.label
                    .toLowerCase()
                    .replace(/[^_a-zA-Z-]/g, '-')}`
        );
}
