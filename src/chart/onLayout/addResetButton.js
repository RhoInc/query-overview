import clone from '../../util/clone';

export default function addResetButton() {
    this.controls.wrap
        .insert('button', ':first-child')
        .attr('id', 'reset-chart')
        .style({
            margin: '5px',
            padding: '5px',
            float: 'right'
        })
        .text('Reset chart')
        .on('click', () => {
            const element = clone(this.div),
                settings = clone(this.initialSettings),
                data = clone(this.raw_data);
            this.listing.destroy();
            this.destroy();
            queryOverview(element, settings).init(data);
        });
}
