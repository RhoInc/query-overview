import updateSelectAll from './updateSelectAll';

export default function syncQueryAgeAndStatus(d, selectedOptions) {
    let filter;
    let select;
    let map;
    if (d.value_col === 'queryage') {
        filter = this.filters.find(filter => filter.col === this.config.status_col);
        select = this.controls.wrap
            .selectAll('select')
            .filter(d => d.value_col === this.config.status_col);
        map = this.maps.queryage;
    } else if (d.value_col === this.config.status_col) {
        filter = this.filters.find(filter => filter.col === 'queryage');
        select = this.controls.wrap.selectAll('select').filter(d => d.value_col === 'queryage');
        map = this.maps.querystatus;
    }
    const correspondingOptions = d3.merge(
        Object.keys(map)
            .filter(key => selectedOptions.indexOf(key) > -1)
            .map(key => map[key])
    );
    filter.val = correspondingOptions;
    select.selectAll('option').property('selected', di => {
        return correspondingOptions.indexOf(di) > -1;
    });
    updateSelectAll.call(this, select.datum(), correspondingOptions);
}
