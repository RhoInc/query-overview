import { select } from 'd3';

export default function updateGroupByOptions() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group select')
        .filter(d => d.label === 'Group by')
        .on('change', function() {
            //Update y-axis label.
            const label = select(this)
                .selectAll('option:checked')
                .text();
            context.config.y.label = label;

            //Update y-axis variable.
            const value_col = context.config.groups.find(group => group.label === label).value_col;
            context.config.y.column = value_col;

            context.config.marks[0].per = [value_col];
            context.draw();
        });
}
