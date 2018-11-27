import clone from '../../util/clone';

export default function addResetButton() {
    this.resetButton = d3
        .select(this.div)
        .insert('button', ':first-child')
        .classed('qo-button qo-button--reset-chart', true)
        .text('Reset chart')
        .on('click', () => {
            const element = this.element;
            const settings = clone(this.initialSettings);
            const data = clone(this.raw_data);
            this.listing.destroy();
            this.destroy();
            d3
                .select(this.element)
                .selectAll('*')
                .remove();
            queryOverview(element, settings).init(data);
        });
}
