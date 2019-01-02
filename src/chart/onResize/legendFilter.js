export default function legendFilter() {
    const context = this;

    //Alter layout of legend.
    const legend = this.legend;
    legend.style('margin-left', `${this.margin.left}px`);
    const legendTitle = legend.select('.legend-title');
    legendTitle.attr('title', 'Add and remove queries by clicking the legend items to the left.');
    legend.node().appendChild(legendTitle.node());

    //Filter data by clicking on legend.
    const statusFilter = this.filters.find(filter => filter.col === this.config.color_by);
    const legendItems = this.wrap
        .selectAll('.legend-item')
        .style({
            cursor: 'pointer',
            'border-radius': '4px',
            padding: '5px',
            'padding-left': '8px'
        })
        .classed(
            'selected',
            d => statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1
        )
        .style(
            'background',
            d =>
                statusFilter.val === 'All' || statusFilter.val.indexOf(d.label) > -1
                    ? 'lightgray'
                    : 'white'
        );
    const statusOptions = this.controls.wrap
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
        context.draw();

        //Remove listing and display listing instruction.
        context.listing.wrap.selectAll('*').remove();
        context.wrap.select('#listing-instruction').style('display', 'block');
        context.listing.init(filtered_data);
    });
}
