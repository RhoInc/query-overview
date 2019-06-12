export default function groupControls() {
    const context = this;

    //Group filters.
    this.controls.filters = {
        container: this.controls.wrap
            .insert('div', ':first-child') //placing filter controls first
            .classed('qo-control-grouping qo-control-grouping--filters', true)
    };
    this.controls.filters.container
        .append('div')
        .classed('qo-control-grouping--label', true)
        .attr(
            'title',
            'Filters subset the data underlying the chart and listing.\nHover over filter labels to view more information about them.'
        )
        .text('Filters');
    this.controls.filters.controlGroups = this.controls.wrap.selectAll('.qo-subsetter');
    this.controls.filters.labels = this.controls.filters.controlGroups.selectAll(
        '.wc-control-label'
    );
    this.controls.filters.selects = this.controls.filters.controlGroups.selectAll('.changer');
    this.controls.filters.controlGroups.each(function(d) {
        context.controls.filters.container.node().appendChild(this);
    });

    //Group other controls.
    this.controls.otherControls = {
        container: this.controls.wrap
            .insert('div', '.qo-dropdown')
            .classed('qo-control-grouping qo-control-grouping--other-controls', true)
    };
    this.controls.otherControls.label = this.controls.otherControls.container
        .append('div')
        .classed('qo-control-grouping--label', true)
        .attr(
            'title',
            'Controls alter the display of the chart.\nHover over control labels to view more information about them.'
        )
        .text('Controls');
    this.controls.otherControls.controlGroups = this.controls.wrap.selectAll(
        '.control-group:not(.qo-subsetter)'
    );
    this.controls.otherControls.labels = this.controls.otherControls.controlGroups.selectAll(
        '.wc-control-label'
    );
    this.controls.otherControls.controlGroups.each(function(d) {
        context.controls.otherControls.container.node().appendChild(this);
    });
}
