import addResetButton from './onLayout/addResetButton';
import addTableContainer from './onLayout/addTableContainer';

export default function onLayout() {
    addResetButton.call(this);
    addTableContainer.call(this);
    this.wrap.select('.sortable-container').classed('hidden', false);
    this.table.style('width', '100%').style('display', 'table');
}
