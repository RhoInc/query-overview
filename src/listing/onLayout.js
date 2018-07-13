import resetListing from './onLayout/resetListing';

export default function onLayout() {
    resetListing.call(this);
    this.wrap.select('.sortable-container').classed('hidden', false);
    this.table.style('width', '100%').style('display', 'table');
}
