export default function addStatusGroupHighlight() {
    this.controls.otherControls.controlGroups
        .filter(d => d.label === 'Status Group')
        .on('mouseover', () => {
            this.legend.select('.legend-title').style({
                'text-decoration': 'underline',
                color: 'red'
            });
        })
        .on('mouseout', () => {
            this.legend.select('.legend-title').style({
                'text-decoration': 'none',
                color: 'black'
            });
        });
}
