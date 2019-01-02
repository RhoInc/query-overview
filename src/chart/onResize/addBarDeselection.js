import mouseoutStyle from './addBarClick/mouseoutStyle';
import mouseoutAttrib from './addBarClick/mouseoutAttrib';
import initListing from './addBarClick/initListing';

export default function addBarDeselection() {
    const context = this;

    this.overlay.on('click', () => {
        this.bars.each(function(d) {
            const bar = d3.select(this);
            const selected = bar.classed('selected');
            mouseoutStyle.call(context, bar, selected, true);
            mouseoutAttrib.call(context, bar, selected, true);
            bar.classed('selected', false);
        });
        initListing.call(this);
    });
}
