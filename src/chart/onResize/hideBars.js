export default function hideBars() {
    this.svg
        .select('g.bar-supergroup')
        .selectAll('g.bar-group')
        .attr('display', d => (this.y_dom.indexOf(d.key) > -1 ? null : 'none'));
}
