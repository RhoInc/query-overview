export default function mouseoutStyle(bar, selected, clear = false) {
    if (!(selected || clear) || (selected && clear))
        bar.style({
            'stroke-width': '1px',
            fill: d => this.colorScale(d.key)
        });
}
