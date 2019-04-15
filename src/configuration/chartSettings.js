export default function chartSettings() {
    return {
        x: {
            label: '# of Queries',
            column: null,
            behavior: 'flex'
        },
        y: {
            type: 'ordinal',
            column: null, // set in syncSettings()
            label: 'Form',
            sort: null // set in syncSettings()
        },
        marks: [
            {
                type: 'bar',
                per: [null], // set in syncSettings()
                split: null, // set in syncSettings()
                arrange: null, // set in syncSettings()
                summarizeX: 'count',
                tooltip: null // set in syncSettings()
            }
        ],
        color_by: null, // set in syncSettings()
        color_dom: null, // set in syncSettings()
        legend: {
            location: 'top',
            label: null, // set in syncSettings()
            order: null // set in syncSettings()
        },
        margin: {
            right: 50 // room for count annotation
        },
        range_band: 25
    };
}
