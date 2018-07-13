export default function setLeftMargin() {
    const fontSize = parseInt(this.wrap.style('font-size'));
    this.config.margin.left =
        Math.max(7, d3.max(this.y_dom, d => d.length)) * fontSize * 0.5 + fontSize * 1.5 * 1.5 + 6;
}
