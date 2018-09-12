export default function addTableContainer() {
    // Place the table inside of a div so that we can use a css trick
    // to place a horizontal scroll bar on top of the table in defineStyles.js
    const table = this.table.node();
    this.tableContainer = this.wrap
        .append('div')
        .classed('table-container', true)
        .node();

    table.parentNode.insertBefore(this.tableContainer, table);
    this.tableContainer.appendChild(table);
    this.tableContainer.scrollLeft = 9999;
}
