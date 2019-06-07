import { sum } from 'd3';

export default function updateXAxisLabel() {
    this.svg
        .select('.x.axis')
        .select('.axis-title')
        .text(this.config.x.label + ' (' + String(sum(this.current_data, d => d.total)) + ')');
}
