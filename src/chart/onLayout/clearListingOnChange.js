export default function clearListingOnChange() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => ['dropdown', 'subsetter'].indexOf(control.type) > -1)
        .on('change', function(d) {
            //Clear bar highlighting.
            context.svg
                .selectAll('.bar')
                .classed('selected', false)
                .style({
                    'stroke-width': '1px',
                    fill: d => context.colorScale(d.key)
                });

            //Reset listing.
            context.listing.wrap.selectAll('*').remove();
            context.listing.init(context.filtered_data);
        });
}
