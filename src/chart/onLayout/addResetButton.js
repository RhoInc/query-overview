import clone from '../../util/clone';

export default function addResetButton() {
    this.controls.wrap
        .insert('button', ':first-child')
        .classed('qo-button--reset-chart', true)
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
