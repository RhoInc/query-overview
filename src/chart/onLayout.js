import clone from '../util/clone';

export default function onLayout() {
    const context = this;

    this.wrap.style('overflow', 'hidden');

    //Handle y-domain length control
    var groupToggles = this.controls.wrap
        .selectAll('.control-group')
        .filter(function(d) {
            return d.label == 'Show first N groups';
        })
        .selectAll('input[type="radio"]');
    groupToggles.property('checked', function(d, i) {
        return d == context.config.cutoff;
    });
    this.config.cutoff = this.config.cutoff === 'All' ? this.raw_data.length : +this.config.cutoff;
    groupToggles.on('change', function() {
        var value = groupToggles
            .filter(function(f) {
                return d3.select(this).property('checked');
            })
            .property('value');
        context.config.cutoff = value == 'All' ? context.raw_data.length : +value;
        context.draw();
    });

    //Clear listing when controls change.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => ['dropdown', 'subsetter'].indexOf(control.type) > -1)
        .on('change', function(d) {
            //Clear bar highlighting.
            context.svg.selectAll('.bar').classed('selected', false).style({
                'stroke-width': '1px',
                fill: d => context.colorScale(d.key)
            });

            //Reset listing.
            context.listing.wrap.selectAll('*').remove();
            context.wrap.select('#listing-instruction').style('display', 'block');

            //Sync status filter with legend items.
            if (d.label === 'Status') {
                const statusFilter = d3.select(this),
                    selectedOptions = statusFilter.selectAll('.changer option:checked').data(), // selected statuses
                    legendItems = context.wrap.selectAll('.legend-item').classed('selected', false), // de-select all legend items
                    selectedLegendItems = legendItems
                        .filter(d => selectedOptions.indexOf(d.label) > -1)
                        .classed('selected', true); // sync legend items with status options

                legendItems.each(function() {
                    const legendItem = d3.select(this), selected = legendItem.classed('selected');
                    legendItem.style({ background: selected ? 'lightgray' : 'white' });
                });
            }
        });

    //Add download link.
    if (this.config.exportData)
        this.controls.wrap
            .insert('a', ':first-child')
            .attr('id', 'downloadCSV')
            .style({
                'text-decoration': 'underline',
                color: 'blue',
                cursor: 'pointer',
                float: 'right',
                margin: '5px',
                padding: '5px',
                clear: 'right'
            })
            .text('Download Query Data');

    //Add reset button.
    this.controls.wrap
        .insert('button', ':first-child')
        .attr('id', 'reset-chart')
        .style({
            margin: '5px',
            padding: '5px',
            float: 'right'
        })
        .text('Reset chart')
        .on('click', () => {
            const element = clone(this.div),
                settings = clone(this.initialSettings),
                data = clone(this.raw_data);
            this.listing.destroy();
            this.destroy();
            queryOverview(element, settings).init(data);
        });

    //Add listing instruction.
    this.wrap
        .append('em')
        .attr('id', 'listing-instruction')
        .text('Click a bar to view its underlying data.');

    //Display group label rather than group column name in Group by control.
    const groupByControl = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.label === 'Group by')
        .on('change', function() {
            const label = d3.select(this).select('option:checked').text(),
                value_col =
                    context.config.groups[context.config.groups.map(d => d.label).indexOf(label)]
                        .value_col;

            context.config.y.column = value_col;
            context.config.marks[0].per = [value_col];
            context.draw();
        });
}
