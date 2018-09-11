export default function updateXAxisLabel() {
    d3
        .select('.x.axis')
        .select('.axis-title')
        .text(this.config.x.label + ' (' + String(d3.sum(this.current_data, d => d.total)) + ')');
}
