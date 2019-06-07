import { select as d3select } from 'd3';
import updateSelectAll from './updateFilterEventListeners/updateSelectAll';
import syncQueryAgeAndStatus from './updateFilterEventListeners/syncQueryAgeAndStatus';

export default function updateFilterEventListeners() {
    const context = this;

    //Update filter event listeners.
    this.controls.filters.selects.on('change', function(d) {
        const select = d3select(this);
        const selectedOptions = select.selectAll('option:checked').data();

        //Update select-all checkbox.
        updateSelectAll.call(context, d, selectedOptions);

        //Sync query age and query status filters.
        if (['Query Age', 'Query Status'].indexOf(d.label) > -1)
            syncQueryAgeAndStatus.call(context, d, selectedOptions);

        //Redraw.
        context.draw();
    });
}
