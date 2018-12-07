export default function checkInitialStatusGroup() {
    this.controls.otherControls.controlGroups
        .filter(d => d.label === 'Status Group')
        .selectAll('.radio')
        .selectAll('.changer')
        .property('checked', d => d === this.config.legend.label);
}
