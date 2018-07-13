export default [
    {
        type: 'dropdown',
        option: 'y.label',
        label: 'Group by',
        description: 'variable toggle',
        start: null, // set in syncControlInputs()
        values: null, // set in syncControlInputs()
        require: true
    },
    {
        type: 'dropdown',
        label: 'Status Group',
        description: 'stratification',
        options: ['marks.0.split', 'color_by'], // will want to change tooltip too
        start: null, // set in syncControlInputs()
        values: null, // set in syncControlInputs()
        require: true
    },
    {
        type: 'radio',
        option: 'marks.0.arrange',
        label: 'Bar Arrangement',
        values: ['stacked', 'grouped']
    },
    {
        type: 'radio',
        option: 'cutoff',
        label: 'Show First N Groups',
        values: ['10', '25', 'All']
    },
    {
        type: 'checkbox',
        option: 'alphabetize',
        label: 'Alphabetical?'
    }
];
