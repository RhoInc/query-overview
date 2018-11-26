import resetListing from './onLayout/resetListing';
import addTableContainer from './onLayout/addTableContainer';

export default function onLayout() {
    resetListing.call(this);
    addTableContainer.call(this);
    this.wrap.select('.sortable-container').classed('hidden', false);
    this.table.style('width', '100%').style('display', 'table');
    console.log(this);
}
