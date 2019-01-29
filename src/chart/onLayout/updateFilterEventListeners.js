import updateSelectAll from './updateFilterEventListeners/updateSelectAll';

export default function updateFilterEventListeners() {
    const context = this;

    this.controls.filters.selects.on('change', function(d) {
        const select = d3.select(this);
        const selectedOptions = select.selectAll('option:checked').data();
        updateSelectAll.call(context, d, selectedOptions);
        context.draw();
    });
}
