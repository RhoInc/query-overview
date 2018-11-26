export default function styles() {
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
            '    display: inline-block;' +
            '}',
            '.qo-row--top {' +
            '}',
            '.qo-row--bottom {' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            '.qo-component--controls {' +
            '    width: 39.5%;' +
            '    float: left;' +
            '    position: relative;' +
            '}',
            '.qo-control-grouping {' +
            '    display: inline-block;' +
            '}',
            '.qo-button--reset-chart {' +
            '    position: absolute;' +
            '    top: 0;' +
            '    left: 0;' +
            '}',

            '.qo-control-grouping--label,' +
            '.wc-control-label {' +
            '    cursor: help;' +
            '}',
            '.span-description {' +
            '    display: none !important;' +
            '}',

            /****---------------------------------------------------------------------------------\
              Other controls
            \---------------------------------------------------------------------------------****/

                '.qo-control-grouping--other-controls {' +
                '    width: 39.5%;' +
                '    float: right;' +
                '}',
                '.qo-control-grouping--other-controls .control-group {' +
                '    display: inline-block !important;' +
                '    width: 100%;' +
                '    margin: 5px 0 0 0 !important;' +
                '}',
                '.qo-control-grouping--other-controls .control-group > * {' +
                '    margin: 0;' +
                '    padding: 0;' +
                '}',

                //dropdowns
                '.qo-dropdown .wc-control-label {' +
                '    display: inline-block !important;' +
                '    width: 44%;' +
                '    text-align: right;' +
                '}',
                '.qo-dropdown .changer {' +
                '    display: inline-block !important;' +
                '    float: right;' +
                '    width: 55%;' +
                '}',

                //radio buttons
                '.qo-radio .wc-control-label {' +
                '    width: 100%;' +
                '    text-align: right;' +
                '}',
                '.qo-radio .radio {' +
                '    display: inline-block !important;' +
                '    float: right !important;' +
                '}',

                //checkboxes
                '.qo-checkbox .wc-control-label {' +
                '    display: inline-block !important;' +
                '    text-align: right;' +
                '    width: 92.5%;' +
                '}',
                '.qo-checkbox .changer {' +
                '    display: inline-block !important;' +
                '    float: right !important;' +
                '}',

            /****---------------------------------------------------------------------------------\
              Filters
            \---------------------------------------------------------------------------------****/

                '.qo-control-grouping--filters {' +
                '    width: 59.5%;' +
                '    float: left;' +
                '    display: flex;' +
                '    flex-wrap: wrap;' +
                '    justify-content: space-evenly;' +
                '}',
                '.qo-control-grouping--label {' +
                '    text-align: center;' +
                '    width: 100%;' +
                '    font-size: 24px;' +
                '    border-bottom: 1px solid #aaa;' +
                '}',
                '.qo-subsetter {' +
                '    margin: 5px 0 0 0 !important;' +
                '}',
                '.qo-subsetter .wc-control-label {' +
                '    margin: 0 5px 3px 0;' +
                '    text-align: center;' +
                '}',
                '.qo-subsetter .changer {' +
                '    margin: 0 auto;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Chart
        \--------------------------------------------------------------------------------------***/

            '.qo-component--chart {' +
            '    width: 59.5%;' +
            '    float: right;' +
            '}',
            '.qo-component--chart .legend-title {' +
            '    cursor: help;' +
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
            '}',
    ];

    //Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
