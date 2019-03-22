export default function addHeaderTooltips() {
    this.thead_cells.attr('title', (d, i) => this.config.descriptions[i]);
}
