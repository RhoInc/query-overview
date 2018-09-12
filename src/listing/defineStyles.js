export default function defineStyles() {
    const styles = [
        '.wc-table .table-container {' +
            '    overflow-x: auto;' +
            '    width : 100%;' +
            '    transform:  rotate(180deg);' +
            ' -webkit-transform:rotate(180deg); ' +
            '}',
        '.wc-table table {' +
            '    transform:  rotate(180deg);' +
            '  -webkit-transform:rotate(180deg); ' +
            '}'
    ];

    //Attach styles to DOM.
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(this.style);
}
