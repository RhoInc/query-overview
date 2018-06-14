import flatMap from '../../util/flatMap';

export default function addBarClick() {
    const context = this;

    const barGroups = this.svg.selectAll('.bar-group');
    const bars = this.svg.selectAll('.bar');
    // will subtract and add to bar to offset increase in stroke-width and prevent bars
    // from overlapping as much when neighbors are both selected.
    const mouseoverAttrib = {
        width: function(d) {
            return this.getBBox().width - 2.5;
        },
        x: function(d) {
            return this.getBBox().x + 2.5;
        }
    };
    const mouseoverStyle = {
        'stroke-width': '5px',
        fill: 'black'
    };
    const mouseoutAttrib = {
        width: function(d) {
            return this.getBBox().width + 2.5;
        },
        x: function(d) {
            return this.getBBox().x - 2.5;
        }
    };
    const mouseoutStyle = {
        'stroke-width': '1px',
        fill: d => context.colorScale(d.key)
    };
    bars
        .style('cursor', 'pointer')
        .on('mouseover', function() {
            if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoverStyle);
            if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoverAttrib);
            //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
            if (!/trident/i.test(navigator.userAgent)) d3.select(this).moveToFront();
        })
        .on('mouseout', function() {
            if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoutStyle);
            if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoutAttrib);
            bars
                .filter(function() {
                    return d3.select(this).classed('selected');
                })
                .moveToFront();
        })
        .on('click', function(d) {
            // this doesn't need a style because mouseout isn't applied when the bar is selected
            d3.select(this).classed('selected', d3.select(this).classed('selected') ? false : true);
            context.listing.wrap.selectAll('*').remove();
            // feed listing data for all selected bars
            context.listing.init(
                d3
                    .selectAll('rect.selected')
                    .data()
                    .flatMap(d => d.values.raw)
            );
            context.wrap.select('#listing-instruction').style('display', 'none'); // remove bar instructions
            // display filtered data if no bars are selected
            if (d3.selectAll('rect.selected')[0].length === 0) {
                context.listing.wrap.selectAll('*').remove();
                context.wrap.select('#listing-instruction').style('display', 'block');
                context.listing.init(context.filtered_data);
            }
        });
}
