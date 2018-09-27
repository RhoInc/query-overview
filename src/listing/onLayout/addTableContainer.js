export default function addTableContainer() {
    // Place the table inside of a div so that we can use a css trick
    // to place a horizontal scroll bar on top of the table in defineStyles.js
    const table = this.table.node();
    this.tableContainer = this.wrap
        .append('div')
        .classed('query-table-container', true)
        .node();

    this.wrap.select('table').classed('query-table', true); // I want to ensure that no other webcharts tables get flipped upside down

    table.parentNode.insertBefore(this.tableContainer, table);
    this.tableContainer.appendChild(table);
    this.tableContainer.scrollLeft = 9999;
}
