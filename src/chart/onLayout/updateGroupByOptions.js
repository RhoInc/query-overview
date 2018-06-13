export default function updateGroupByOptions() {
    const context = this;

    const groupByControl = this.controls.wrap
        .selectAll('.control-group select')
        .filter(d => d.label === 'Group by')
        .on('change', function() {
            const label = d3
                    .select(this)
                    .select('option:checked')
                    .text(),
                value_col =
                    context.config.groups[context.config.groups.map(d => d.label).indexOf(label)]
                        .value_col;

            context.config.y.column = value_col;
            context.config.marks[0].per = [value_col];
            context.draw();
        });
}
