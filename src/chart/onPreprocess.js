import updateStratification from './onPreprocess/updateStratification';
import highlightSelectedOptions from './onPreprocess/highlightSelectedOptions';
import updateRangeBand from './onPreprocess/updateRangeBand';

export default function onPreprocess() {
    highlightSelectedOptions.call(this);
    updateStratification.call(this);
    updateRangeBand.call(this);

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
}
