export default function styles(document) {
    const styles = [

        /***--------------------------------------------------------------------------------------\
          Framework
        \--------------------------------------------------------------------------------------***/

            '.query-overview {' +
            '    width: 100%;' +
            '    display: inline-block;' +
            '}',
            '.qo-row {' +
            '    width: 100%;' +
            '    display: inline-block;' +
            '}',
            '.qo-component {' +
            '}',
            '.qo-row--top {' +
            '}',
            '.qo-row--bottom {' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            '.qo-component--controls {' +
            '    width: 100%;' +
            '}',
            '.qo-component--controls .wc-controls {' +
            '    margin-bottom: 0;' +
            '}',
            '.qo-control-grouping {' +
            '    display: inline-block;' +
            '}',
            '.qo-button {' +
            '    float: left;' +
            '    display: block;' +
            '}',
            '.qo-control-grouping--label,' +
            '.wc-control-label {' +
            '    cursor: help;' +
            '    margin-bottom: 3px;' +
            '}',
            '.qo-control-grouping--label {' +
            '    text-align: center;' +
            '    width: 100%;' +
            '    font-size: 24px;' +
            '    border-bottom: 2px solid #aaa;' +
            '}',
            '.span-description {' +
            '    display: none !important;' +
            '}',

            /****---------------------------------------------------------------------------------\
              Other controls
            \---------------------------------------------------------------------------------****/

                '.qo-control-grouping--other-controls {' +
                '    width: 20%;' +
                '    float: right;' +
                '}',
                '.qo-control-grouping--other-controls .control-group {' +
                '    width: 100%;' +
                '    margin-bottom: 15px;' +
                '}',
                '.qo-control-grouping--other-controls .control-group:nth-child(n+3) {' +
                '    border-top: 1px solid #aaa;' +
                '}',
                '.qo-control-grouping--other-controls .control-group .wc-control-label {' +
                '    text-align: center;' +
                '    font-size: 110%;' +
                '}',

                //dropdowns
                '.qo-dropdown {' +
                '}',
                '.qo-dropdown .wc-control-label {' +
                '}',
                '.qo-dropdown .changer {' +
                '    margin: 0 auto;' +
                '}',

                //radio buttons
                '.qo-radio {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '    flex-wrap: wrap;' +
                '}',
                '.qo-radio .wc-control-label {' +
                '    width: 100%;' +
                '}',
                '.qo-radio .radio {' +
                '    margin-top: 0 !important;' +
                '}',

                //checkboxes
                '.qo-checkbox {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '}',
                '.qo-checkbox .wc-control-label {' +
                '    margin-right: 5px;' +
                '}',
                '.qo-checkbox .changer {' +
                '    margin-top: 5px !important;' +
                '}',

            /****---------------------------------------------------------------------------------\
              Filters
            \---------------------------------------------------------------------------------****/

                '.qo-control-grouping--filters {' +
                '    width: 20%;' +
                '    float: left;' +
                (
                    typeof navigator !== 'undefined' && !/trident/i.test(navigator.userAgent)
                        ? '    display: flex;' +
                          '    flex-wrap: wrap;' +
                          '    justify-content: space-evenly;'
                        : '    display: inline-block;'
                ) +
                '}',
                '.qo-subsetter {' +
                '    margin: 5px 2px !important;' +
                '    border-top: 1px solid #aaa;' +
                '    padding-top: 5px;' +
                '    display: inline-block !important;' +
                '    vertical-align: top;' +
                '}',
                '.qo-subsetter .wc-control-label {' +
                '    margin: 0 5px 3px 0;' +
                '    text-align: center;' +
                '}',
                '.qo-select-all {' +
                '}',
                '.qo-subsetter .changer {' +
                '    margin: 0 auto;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Chart
        \--------------------------------------------------------------------------------------***/

            '.qo-component--chart {' +
            '    width: 58%;' +
            '    margin: 0 auto;' +
            '    position: relative;' +
            '}',
            '.qo-button--reset-chart {' +
            '    position: absolute;' +
            '    top: 0;' +
            '    left: 0;' +
            '    z-index: 2;' +
            '    width: 91px;' +
            '    padding: 3px 0;' +
            '}',
            '.qo-button--undo {' +
            '    position: absolute;' +
            '    bottom: 0;' +
            '    left: 0;' +
            '    z-index: 2;' +
            '    width: 91px;' +
            '    padding: 3px 0;' +
            '}',
            '.qo-component--chart .wc-chart {' +
            '    z-index: 1;' +
            '}',
            '.qo-component--chart .legend-title {' +
            '    cursor: help;' +
            '}',
            '.qo-component--chart .legend-item {' +
            '    cursor: pointer;' +
            '    border-radius: 4px;' +
            '    padding: 5px;' +
            '    padding-left: 8px;' +
            '    margin-right: 5px !important;' +
            '}',
            '.qo-component--chart .y.axis .tick text {' +
            '    font-family: "Lucida Console", "Courier New", "Monospace";' +
            '    font-size: 14px;' +
            '}',
            '.qo-footnote {' +
            '    width: 100%;' +
            '    text-align: center;' +
            '    font-style: italic;' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            '.qo-component--listing {' +
            '    width: 100%;' +
            '}',
            '.qo-button--reset-listing {' +
            '    padding: 3px;' +
            '    margin: 10px 5px 10px 0;' +
            '}',
            '.qo-table-container {' +
            '    overflow-x: auto;' +
            '    width: 100%;' +
            '    transform: rotate(180deg);' +
            '    -webkit-transform: rotate(180deg); ' +
            '}',
            '.qo-table {' +
            '    width: 100%;' +
            '    transform: rotate(180deg);' +
            '    -webkit-transform: rotate(180deg); ' +
            '    display: table;' +
            '}',
            '.qo-table th {' +
            '    white-space: nowrap;' +
            '}',
            '.qo-table th,' +
            '.qo-table td {' +
            '    min-width: 100px;' +
            '    padding-right: 10px !important;' +
            '}',
    ];

    //Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);

    return style;
}
