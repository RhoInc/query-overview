import mouseoutStyle from './addBarClick/mouseoutStyle';
import mouseoutAttrib from './addBarClick/mouseoutAttrib';
import initListing from './addBarClick/initListing';

export default function addBarDeselection() {
    const context = this;

    this.overlay.on('click', () => {
        this.bars.classed('selected', false).each(function(d) {
            mouseoutStyle.call(context, this);
            mouseoutAttrib.call(context, this);
        });
        initListing.call(this);
    });
}
