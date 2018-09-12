export default function addTableContainer() {
    // Place the table inside of a div so that we can use a css trick
    // to place a horizontal scroll bar on top of the table in defineStyles.js
    var table = document.querySelector('table');
    var container = document.createElement('div');

    table.parentNode.insertBefore(container, table);
    container.appendChild(table);
    container.className = 'table-container';
}
