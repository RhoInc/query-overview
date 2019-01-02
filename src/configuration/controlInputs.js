export default [
    {
        type: 'dropdown',
        label: 'Status Group',
        option: 'color_by_col',
        start: null, // set in syncControlInputs()
        values: null, // set in syncControlInputs()
        require: true
    },
    {
        type: 'dropdown',
        option: 'y.label',
        label: 'Group by',
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
        label: 'Order groups alphabetically?'
    }
];
