export default {
    x: {
        label: '# of Queries',
        behavior: 'flex'
    },
    y: {
        type: 'ordinal',
        column: null, // set in syncSettings()
        label: 'Form',
        sort: 'total-descending',
        range_band: 25,
    },
    marks: [
        {
            type: 'bar',
            per: [null], // set in syncSettings()
            split: null, // set in syncSettings()
            arrange: 'stacked',
            summarizeX: 'count',
            tooltip: null // set in syncSettings()
        }
    ],
    color_by: null, // set in syncSettings()
    color_dom: null, // set in syncSettings()
    legend: {
        location: 'top',
        //  label: 'Query Status',
        label: null,
        order: null // set in syncSettings()
    },
    range_band: 25,
    margin: { right: '50' } // room for count annotation
};
