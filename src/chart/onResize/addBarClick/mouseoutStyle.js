export default function mouseoutStyle(element) {
    const selection = d3.select(element);
    selection.style({
        'stroke-width': '1px',
        fill: d => this.colorScale(d.key),
    });
}
