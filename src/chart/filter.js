export default function filter() {
    const context = this;

    //Sync status filter with legend items.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => ['dropdown', 'subsetter'].indexOf(control.type) > -1)
        .on('change', function(d) {
            //grab the filter corresponding to the current status group
            //const currentfilter = context.filters.filter(filter => filter.col == context.config.marks[0].split)

            const desiredControl = context.controls.config.inputs.findIndex(
                filter =>
                    filter.value_col == context.config.marks[0].split && filter.label !== 'Status'
            );

            const ind = context.controls.config.inputs.findIndex(input => input.label == 'Status');

            console.log(desiredControl);

            console.log(ind);
            context.controls.config.inputs.splice(
                ind,
                1,
                context.controls.config.inputs[desiredControl]
            );

            console.log(context);
            //Clear bar highlighting.
            context.svg
                .selectAll('.bar')
                .classed('selected', false)
                .style({
                    'stroke-width': '1px',
                    fill: d => context.colorScale(d.key)
                });

            //Reset listing.
            context.listing.wrap.selectAll('*').remove();
            context.wrap.select('#listing-instruction').style('display', 'block');

            //Sync status filter with legend items.
            if (d.value_col === context.config.marks[0].split) {
                const statusFilter = d3.select(this),
                    selectedOptions = statusFilter.selectAll('.changer option:checked').data(), // selected statuses
                    legendItems = context.wrap.selectAll('.legend-item').classed('selected', false), // de-select all legend items
                    selectedLegendItems = legendItems
                        .filter(d => selectedOptions.indexOf(d.label) > -1)
                        .classed('selected', true); // sync legend items with status options

                legendItems.each(function() {
                    const legendItem = d3.select(this),
                        selected = legendItem.classed('selected');
                    legendItem.style({ background: selected ? 'lightgray' : 'white' });
                });
            }
            context.listing.init(context.filtered_data);
        });

    //Filter data by clicking on legend.
    const legendItems = this.wrap.selectAll('.legend-item').style({
            cursor: 'pointer',
            'border-radius': '4px',
            padding: '5px',
            'padding-left': '8px'
        }), // legend items
        statusOptions = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.value_col === context.config.marks[0].split)
            .selectAll('.changer option'); // status filter options
    legendItems.selectAll('.legend-mark-text').remove(); // don't need 'em
    legendItems.on('click', function(d) {
        const legendItem = d3.select(this), // clicked legend item
            selected = !legendItem.classed('selected'); // selected boolean
        legendItem.classed('selected', selected); // toggle selected class
        const selectedLegendItems = legendItems
            .filter(function() {
                return d3.select(this).classed('selected');
            })
            .data()
            .map(d => d.label); // selected statuses
        legendItem.style({
            background: selected ? 'lightgray' : 'white'
        }); // set background of legend items corresponding to selected statuses to light gray
        statusOptions
            .property('selected', false)
            .filter(d => selectedLegendItems.indexOf(d) > -1)
            .property('selected', true); // set selected property of status options corresponding to selected statuses to true
        const filtered_data = context.raw_data.filter(d => {
            let filtered = selectedLegendItems.indexOf(d[context.config.marks[0].split]) === -1;

            context.filters
                .filter(filter => filter.col !== context.config.marks[0].split)
                .forEach(filter => {
                    if (filtered === false && filter.val !== 'All')
                        filtered =
                            typeof filter.val === 'string'
                                ? d[filter.col] !== filter.val
                                : filter.val.indexOf(d[filter.col]) === -1;
                });

            return !filtered;
        }); // define filtered data

        context.filters.filter(
            filter => filter.col === context.config.marks[0].split
        )[0].val = selectedLegendItems;

        //Clear bar highlighting.
        context.svg
            .selectAll('.bar')
            .classed('selected', false)
            .style({
                'stroke-width': '1px',
                fill: d => context.colorScale(d.key)
            });

        //Remove listing and display listing instruction.
        context.listing.wrap.selectAll('*').remove();
        context.wrap.select('#listing-instruction').style('display', 'block');
        context.listing.init(filtered_data);
    });
}
