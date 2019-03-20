import updateSelectAll from './updateFilterEventListeners/updateSelectAll';
import syncQueryAgeAndStatus from './updateFilterEventListeners/syncQueryAgeAndStatus';

export default function updateFilterEventListeners() {
    const context = this;

    this.controls.filters.selects.on('change', function(d) {
        const select = d3.select(this);
        const selectedOptions = select.selectAll('option:checked').data();
        updateSelectAll.call(context, d, selectedOptions);
        if (['queryage', context.config.status_col].indexOf(d.value_col) > -1)
            syncQueryAgeAndStatus.call(context, d, selectedOptions);
        context.draw();
    });
}
