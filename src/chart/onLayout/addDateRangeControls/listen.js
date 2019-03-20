import update from './update';
import filter from './filter';

export default function listen(dateRange) {
    const context = this;

    //Attach an event listener to sliders.
    dateRange.sliders = dateRange.container.selectAll('.qo-slider').on('change', function(d) {
        const sliders = this.parentNode.querySelectorAll('input[type=range]');
        const slider1 = parseFloat(sliders[0].value);
        const slider2 = parseFloat(sliders[1].value);

        if (slider1 <= slider2) {
            d.lower = new Date(slider1);
            d.upper = new Date(slider2);
        } else {
            d.lower = new Date(slider2);
            d.upper = new Date(slider1);
        }

        update.call(context, d);
        filter.call(context);
        context.draw();

        //Reset listing.
        context.listing.wrap.selectAll('*').remove();
        context.listing.init(context.filtered_data);
    });

    //Attach an event listener to checkboxes
    dateRange.checkboxes = dateRange.container
        .selectAll('.qo-slider-missing__checkbox')
        .on('change', function(d) {
            d.includeMissing = this.checked;

            filter.call(context);
            context.draw();

            //Reset listing.
            context.listing.wrap.selectAll('*').remove();
            context.listing.init(context.filtered_data);
        });
}
