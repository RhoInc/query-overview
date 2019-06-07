import { select } from 'd3';
import clone from '../../util/clone';

export default function addResetButton() {
    this.resetButton = select(this.div)
        .insert('button', ':first-child')
        .classed('qo-button qo-button--reset-chart', true)
        .text('Reset chart')
        .on('click', () => {
            const element = this.element;
            const settings = clone(this.initialSettings);
            const data = clone(this.raw_data);
            this.destroy();
            queryOverview(element, settings).init(data);
        });
}
