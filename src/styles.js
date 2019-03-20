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
                '    display: flex;' +
                '    flex-wrap: wrap;' +
                '    justify-content: space-evenly;' +
                '}',
                '.qo-subsetter {' +
                '    margin: 5px 2px !important;' +
                '    border-top: 1px solid #aaa;' +
                '    padding-top: 5px;' +
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

                //sliders
                '.qo-slider-container {' +
                    '    position: relative;' +
                    '    width: 100%;' +
                    '    height: 30px;' +
                    '    display: inline-block;' +
                    '}',
                '.qo-slider-container > * {' +
                    '    display: inline-block;' +
                    '}',
                '.qo-slider-missing {' +
                    '    float: left;' +
                    '    clear: right;' +
                    '}',
                '.qo-subsetter--open-date .qo-slider-missing {' +
                    '    display: none;' +
                    '}',
                '.qo-slider {' +
                    '    width: 100%;' +
                    '    pointer-events: none;' +
                    '    position: absolute;' +
                    '    height: 15px;' +
                    '    top: 1px;' +
                    '    overflow: hidden;' +
                    '    outline: none;' +
                    '}',
                '.qo-slider-annotation {' +
                    '    width: 100%;' +
                    '    position: absolute;' +
                    '    font-size: 12px;' +
                    '    top: 16px;' +
                    '    overflow: hidden;' +
                    '    font-weight: normal;' +
                    '    z-index: -1;' +
                    '}',
                '.qo-slider-annotation--lower {' + '    text-align: left;' + '}',
                '.qo-slider-annotation--upper {' + '    text-align: right;' +
                    '    width: 50%;' +
                    '    position: absolute;' +
                    '    right: 0;' +
                    '    bottom: 0;' +
                    '}',
                '.qo-slider::-webkit-slider-thumb {' +
                    '    pointer-events: all;' +
                    '    position: relative;' +
                    '    z-index: 1;' +
                    '    outline: 0;' +
                    '}',
                '.qo-slider::-moz-range-thumb {' +
                    '    pointer-events: all;' +
                    '    position: relative;' +
                    '    z-index: 10;' +
                    '    -moz-appearance: none;' +
                    '    width: 9px;' +
                    '}',
                '.qo-slider::-moz-range-track {' +
                    '    position: relative;' +
                    '    z-index: -1;' +
                    '    background-color: rgba(0, 0, 0, 1);' +
                    '    border: 0;' +
                    '}',
                '.qo-slider::-moz-range-track {' +
                    '    -moz-appearance: none;' +
                    '    background: none transparent;' +
                    '    border: 0;' +
                    '}',
                '.qo-slider::-moz-focus-outer {' + '    border: 0;' + '}',

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
            '}',
    ];

    //Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
