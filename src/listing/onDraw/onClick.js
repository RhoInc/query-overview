import manualSort from './onClick/manualSort';

export default function onClick() {
    const context = this;

    this.thead_cells
        .on('click', function(d) {
            const th = this;
            const header = d;
            const selection = d3.select(th);
            const col = context.config.cols[context.config.headers.indexOf(header)];

            //Check if column is already a part of current sort order.
            let sortItem = context.sortable.order.filter(item => item.col === col)[0];

            //If it isn't, add it to sort order.
            if (!sortItem) {
                sortItem = {
                    col: col,
                    direction: 'ascending',
                    wrap: context.sortable.wrap
                        .append('div')
                        .datum({ key: col })
                        .classed('wc-button sort-box', true)
                        .text(header)
                };
                sortItem.wrap.append('span').classed('sort-direction', true).html('&darr;');
                sortItem.wrap.append('span').classed('remove-sort', true).html('&#10060;');
                context.sortable.order.push(sortItem);
            } else {
                //Otherwise reverse its sort direction.
                sortItem.direction = sortItem.direction === 'ascending' ? 'descending' : 'ascending';
                sortItem.wrap
                    .select('span.sort-direction')
                    .html(sortItem.direction === 'ascending' ? '&darr;' : '&uarr;');
            }

            //Hide sort instructions.
            context.sortable.wrap.select('.instruction').classed('hidden', true);

            //Add sort container deletion functionality.
            context.sortable.order.forEach((item, i) => {
                item.wrap.on('click', function(d) {
                    //Remove column's sort container.
                    d3.select(this).remove();

                    //Remove column from sort.
                    context.sortable.order.splice(context.sortable.order.map(d => d.col).indexOf(d.key), 1);

                    //Display sorting instruction.
                    context.sortable.wrap
                        .select('.instruction')
                        .classed('hidden', context.sortable.order.length);

                    //Redraw chart.
                    manualSort.call(context);
                });
            });

            //Redraw chart.
            manualSort.call(context);
        });
}
