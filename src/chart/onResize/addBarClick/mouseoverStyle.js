export default function mouseoverStyle(element) {
    const selection = d3.select(element);
    selection.style({
        'stroke-width': '5px',
        fill: 'black',
    });
}
