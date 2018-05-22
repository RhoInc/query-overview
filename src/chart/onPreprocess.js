import updateStratification from './onPreprocess/updateStratification';

export default function onPreprocess() {
    const context = this;

    updateStratification.call(this);

    //console.log(context);

    //this.controls.config.inputs.filter(
    //    controlInput => controlInput.label === 'Status'
    //)[0].value_col =
    //    context.config.marks[0].split;

    //this.filters[1].col = context.config.marks[0].split;

    //console.log(context);

    const barArrangementControl = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.label === 'Bar Arrangement');
    if (this.config.y.column === 'Status') {
        this.config.marks[0].arrange = 'stacked';
        barArrangementControl
            .selectAll('.radio')
            .filter(d => d === 'stacked')
            .select('input')
            .property('checked', true);
        barArrangementControl.selectAll('input').property('disabled', true);
    } else barArrangementControl.selectAll('input').property('disabled', false);
    //Change rangeBand() depending on bar arrangement.

    console.log('cats');
    let max = 0;
    let test = d3
        .nest()
        .key(d => d[this.config.y.column])
        .key(d => d[this.config.color_by])
        .rollup(d => {
            max = Math.max(max, d.length);
            return d.length;
        })
        .entries(this.raw_data);
    if (this.config.marks[0].arrange === 'stacked') {
        this.config.range_band = 15;
        this.config.x.domain = [0, null];
    } else {
        this.config.range_band = 60;
        this.config.x.domain = [0, max];
    }
}
