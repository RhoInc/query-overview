export default function addGroupByHighlight() {
    this.controls.otherControls.controlGroups
        .filter(d => d.label === 'Group by')
        .on('mouseover', () => {
            this.svg.selectAll('.y.axis .axis-title').style({
                'font-weight': 'bold',
                'text-decoration': 'underline',
                fill: 'red'
            });
        })
        .on('mouseout', () => {
            this.svg.selectAll('.y.axis .axis-title').style({
                'font-weight': 'normal',
                'text-decoration': 'none',
                fill: 'black'
            });
        });
}
