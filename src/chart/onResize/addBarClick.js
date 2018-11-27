import mouseoverStyle from './addBarClick/mouseoverStyle';
import mouseoverAttrib from './addBarClick/mouseoverAttrib';
import mouseoutStyle from './addBarClick/mouseoutStyle';
import mouseoutAttrib from './addBarClick/mouseoutAttrib';

export default function addBarClick() {
    const context = this;

    // will subtract and add to bar to offset increase in stroke-width and prevent bars
    // from overlapping as much when neighbors are both selected.
    this.bars = this.svg.selectAll('.bar')
        .style('cursor', 'pointer')
        .on('mouseover', function() {
            if (!d3.select(this).classed('selected')) mouseoverStyle.call(context, this);
            if (!d3.select(this).classed('selected')) mouseoverAttrib.call(context, this);;
            //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
            if (!/trident/i.test(navigator.userAgent)) d3.select(this).moveToFront();
        })
        .on('mouseout', function() {
            if (!d3.select(this).classed('selected')) mouseoutStyle.call(context, this);
            if (!d3.select(this).classed('selected')) mouseoutAttrib.call(context, this);;
            context.bars
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
            // display filtered data if no bars are selected
            if (d3.selectAll('rect.selected')[0].length === 0) {
                context.listing.wrap.selectAll('*').remove();
                context.listing.init(context.filtered_data);
            }
        });
}
