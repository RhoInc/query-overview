import { select } from 'd3';

export default function addControlTooltips() {
    const tooltips = {
        //other controls
        'Group by':
            'Controls the variable with which the queries are grouped; each group is plotted along the vertical axis of the chart.',
        'Status Group': 'Controls the variable with which the bars are subdivided.',
        'Bar Arrangement':
            'Controls the layout of the status groups.\n- stacked: status groups are plotted side-by-side horizontally\n- grouped: status groups are plotted side-by-side vertically',
        'Show First N Groups': 'Controls the number of groups displayed on the vertical axis.',
        'Order Groups Alphabetically?':
            'Controls the order of the groups; uncheck to sort groups by magnitude (largest to smallest number of queries) instead of alphabetically.',

        //filters
        'Query Age':
            'Open queries are broken down into how long they have been open. All other queries are classified by status (answered, closed, cancelled).',
        'Query Status':
            'Open: site has not responded to the issue\nAnswered: site has responded to issue; DM needs to review\nClosed: issue resolved\nCancelled: query cancelled by DM',
        'Query Recency':
            'Number of days a query has been open, regardless of its current status (applies only to queries opened in the past 30 days)',
        Form:
            'CRF page abbreviation; hover over the abbreviation in the chart to see its full name.',
        Site: 'Name or ID of site',
        'Marking Group': 'Entity that opened the query',
        'Visit/Folder':
            'Visit/folder abbreviation; hover over the visit/folder abbreviation in the chart to see the full name.'
    };
    this.controls.controlGroups.each(function(d) {
        const tooltip =
            tooltips[d.label] ||
            `This ${d.type} controls ${d.value_col || d.option || d.options.join(', ')}.`;
        if (tooltips[d.label] === undefined)
            console.warn(
                `The control labeled ${
                    d.label
                } does not have a curated tooltip. Defaulting to ${tooltip}.`
            );
        select(this)
            .selectAll('.wc-control-label')
            .attr('title', tooltip);
    });
}
