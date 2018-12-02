export default {
    //query variables
    form_col: 'formoid',
    formDescription_col: 'ecrfpagename',
    field_col: 'fieldname',
    fieldDescription_col: 'fieldname',
    site_col: 'sitename',
    marking_group_col: 'markinggroup',
    visit_col: 'folderoid',
    color_by_col: 'queryage', // options: [ 'queryage' , 'querystatus' ] or any of status_groups[].value_col

    //query age
    age_statuses: ['Open'],
    age_col: 'qdays',
    age_cutoffs: [14, 28, 56, 112],
    age_range_colors: [
        '#ffffcc',
        '#ffeda0',
        '#fed976',
        '#feb24c',
        '#fd8d3c',
        '#fc4e2a',
        '#e31a1c',
        '#bd0026',
        '#800026'
    ],

    //query status
    status_col: 'querystatus',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    status_colors: ['#fd8d3c', '#4daf4a', '#377eb8', '#999999'],

    //query recency
    recency_col: 'open_time',
    recency_cutoffs: [7, 14, 30],

    //miscellany
    groups: null,
    status_groups: null,
    filters: null,
    dropdown_size: 6,
    details: null,
    bar_arrangement: 'stacked',
    cutoff: 'All',
    alphabetize: true,
    range_band: 25,
    nRowsPerPage: 25,
    exportable: true
};
