export default function addTooltipsToFilterOptions() {
    this.controls.filters.selects.selectAll('option').attr('title', d => d);
}
