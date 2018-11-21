export default function addControlTooltips() {
    const tooltips = {
        //other controls
        'Status Group':
            'This option controls what variable the bars of the graph are stratified by.',
        'Group By':
            'This option controls how queries are grouped down the left side of the graphic.',
        'Bar Arrangement':
            'Stacked=all stratification variables shown in one row; Grouped=separate row for each stratification variable.',
        'Show First N Groups': 'Select to show the first 10, 25, or all of the group variables.',
        'Order groups alphabetically?':
            'Uncheck for graph to sort by magnitude (largest to smallest number of queries) instead of alphabetical.',

        //filters
        'Query Age Category':
            'Open queries are broken down into how long they have been open. All other queries are classified by status (answered, closed, cancelled).',
        'Query Status':
            'Open=site has not responded to the issue; Answered=site has responded to issue, DM needs to review; Closed=Issues resolved; Cancelled=query cancelled by DM.',
        'Query Open Time':
            'For queries opened within the last 30 days this is how long ago the query was opened, regardless of current status.',
        Form:
            'CRF page abbreviation. Hover over the abbreviation in the graph to see the full name.',
        Site: 'Name of site',
        'Marking Group': 'Entity that opened the query',
        'Visit/Folder':
            'Visit/folder abbreviation. Hover over the visit/folder abbreviation in the graph to see the full name.'
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
        d3
            .select(this)
            .selectAll('.wc-control-label')
            .attr('title', tooltip);
    });
}
