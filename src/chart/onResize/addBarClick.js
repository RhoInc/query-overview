import { select } from 'd3';
import mouseoverStyle from './addBarClick/mouseoverStyle';
import mouseoverAttrib from './addBarClick/mouseoverAttrib';
import mouseoutStyle from './addBarClick/mouseoutStyle';
import mouseoutAttrib from './addBarClick/mouseoutAttrib';
import resetListing from './addBarClick/resetListing';

export default function addBarClick() {
    const context = this;

    // will subtract and add to bar to offset increase in stroke-width and prevent bars
    // from overlapping as much when neighbors are both selected.
    this.bars = this.svg
        .selectAll('.bar')
        .style('cursor', 'pointer')
        .on('mouseover', function() {
            const bar = select(this);
            const selected = bar.classed('selected');

            //Apply highlight attributes and styles to bar.
            mouseoverStyle.call(context, bar, selected);
            mouseoverAttrib.call(context, bar, selected);

            //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
            if (!/trident/i.test(navigator.userAgent)) select(this).moveToFront();
        })
        .on('mouseout', function() {
            const bar = select(this);
            const selected = bar.classed('selected');

            //Apply default attributes and styles to bar.
            mouseoutStyle.call(context, bar, selected);
            mouseoutAttrib.call(context, bar, selected);

            //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
            if (!/trident/i.test(navigator.userAgent))
                context.bars
                    .filter(function() {
                        return select(this).classed('selected');
                    })
                    .moveToFront();
        })
        .on('click', function(d) {
            const bar = select(this);
            const selected = bar.classed('selected');

            //Update selected class of clicked bar.
            bar.classed('selected', !selected);

            //Reset listing.
            resetListing.call(context);
        });
}
