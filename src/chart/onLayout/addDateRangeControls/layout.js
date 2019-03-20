export default function layout(dateRange) {
    const context = this;

    //container
    dateRange.container = this.controls.filters.container
        .append('div')
        .datum(dateRange)
        .classed(
            `control-group qo-subsetter qo-subsetter--${
                dateRange.property
            }-date qo-slider-container`,
            true
        );

    //label
    dateRange.container
        .append('span')
        .classed('wc-control-label qo-slider-label', true)
        .attr('title', `Choose a range of query ${dateRange.property} dates.`)
        .text(dateRange.label);

    //missing dates
    dateRange.container
        .append('label')
        .classed('qo-slider-missing', true)
        .text('Include missing dates: ')
        .append('input')
        .classed('qo-slider-missing__checkbox', true)
        .attr('type', 'checkbox')
        .attr(
            'title',
            `If checked, queries without a ${
                dateRange.property
            } date will be included in addition to queries with a date that falls in the date range defined above.`
        )
        .property('checked', dateRange.includeMissing);

    //lower slider
    dateRange.lowerSlider = dateRange.container
        .append('input')
        .classed('qo-slider qo-slider--lower', true)
        .attr({
            type: 'range',
            step: 24 * 60 * 60 * 1000,
            min: dateRange.range[0].getTime(),
            max: dateRange.range[1].getTime()
        })
        .property('value', dateRange.range[0].getTime());

    dateRange.lowerAnnotation = dateRange.container
        .append('span')
        .classed('qo-slider-annotation qo-slider-annotation--lower', true);

    //upper slider
    dateRange.upperSlider = dateRange.container
        .append('input')
        .classed('qo-slider qo-slider--upper', true)
        .attr({
            type: 'range',
            step: 24 * 60 * 60 * 1000,
            min: dateRange.range[0].getTime(),
            max: dateRange.range[1].getTime()
        })
        .property('value', dateRange.range[1].getTime());

    dateRange.upperAnnotation = dateRange.container
        .append('span')
        .classed('qo-slider-annotation qo-slider-annotation--upper', true);
}
