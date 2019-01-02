export default function mouseoverStyle(bar, selected) {
    if (!selected)
        bar.style({
            'stroke-width': '5px',
            fill: 'black'
        });
}
