import { select } from 'd3';
import mouseoutStyle from './addBarClick/mouseoutStyle';
import mouseoutAttrib from './addBarClick/mouseoutAttrib';
import resetListing from './addBarClick/resetListing';

export default function addBarDeselection() {
    const context = this;

    this.overlay.on('click', () => {
        this.bars.each(function(d) {
            const bar = select(this);
            const selected = bar.classed('selected');
            mouseoutStyle.call(context, bar, selected, true);
            mouseoutAttrib.call(context, bar, selected, true);
            bar.classed('selected', false);
        });
        resetListing.call(this);
    });
}
