export default function groupControls() {
    const context = this;

    //Group other controls.
    this.controls.otherControls = {
        container: this.controls.wrap
            .insert('div', ':first-child')
            .classed('qo-control-grouping qo-control-grouping--other-controls', true)
    };
    this.controls.otherControls.label = this.controls.otherControls.container
        .append('div')
        .classed('qo-control-grouping--label', true)
        .text('Controls');
    this.controls.otherControls.controlGroups = this.controls.wrap.selectAll(
        '.control-group:not(.qo-subsetter)'
    );
    this.controls.otherControls.labels = this.controls.otherControls.controlGroups
        .selectAll('.wc-control-label');
    this.controls.otherControls.controlGroups.each(function(d) {
        context.controls.otherControls.container.node().appendChild(this);
    });

    //Group filters.
    this.controls.filters = {
        container: this.controls.wrap
            .insert('div', '.qo-subsetter')
            .classed('qo-control-grouping qo-control-grouping--filters', true)
    };
    this.controls.filters.container
        .append('div')
        .classed('qo-control-grouping--label', true)
        .text('Filters');
    this.controls.filters.controlGroups = this.controls.wrap.selectAll('.qo-subsetter');
    this.controls.filters.labels = this.controls.filters.controlGroups
        .selectAll('.wc-control-label');
    this.controls.filters.controlGroups.each(function(d) {
        context.controls.filters.container.node().appendChild(this);
    });
}
