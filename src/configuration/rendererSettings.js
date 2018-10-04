export default {
    //query variables
    form_col: 'formoid',
    formDescription_col: 'ecrfpagename',
    field_col: 'fieldname',
    fieldDescription_col: 'fieldname', //there is not a dscriptive column in the test data prescribed by heather
    marking_group_col: 'markinggroup',
    visit_col: 'folderoid',

    //query open time settings
    open_col: 'open_time',
    open_category_col: 'Query Open Time Category',
    open_category_order: ['0-7 days', '8-14 days', '15-30 days', '>30 days'],

    //query age settings
    age_col: 'qdays',
    age_category_col: 'Query Age Category',
    age_category_order: null,
    age_category_colors: ['#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026', '#1f78b4', 'gray'],

    //query status settings
    status_col: 'querystatus',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    status_colors: ['#fb9a99', '#fdbf6f', '#1f78b4', 'gray'],

    groups: null,
    status_groups: null,
    site_col: 'sitename',
    filters: null,
    details: null,
    dropdown_size: 6,
    cutoff: 'All',
    alphabetize: true,
    exportable: true,
    nRowsPerPage: 10
};
