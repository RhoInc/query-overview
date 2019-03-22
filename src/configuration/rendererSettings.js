export default function rendererSettings() {
    return {
        //query variables
        site_col: 'sitename',
        id_col: 'subjectnameoridentifier',
        visit_col: 'folderoid',
        visitDescription_col: 'folderinstancename',
        form_col: 'formoid',
        formDescription_col: 'ecrfpagename',
        field_col: 'fieldname',
        fieldDescription_col: 'fieldlabel',
        marking_group_col: 'markinggroup',
        open_by_col: 'queryopenby',
        query_col: 'querytext',
        query_response_col: 'queryresponsetext',

        //query status
        status_col: 'querystatus',
        status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
        status_colors: ['#fd8d3c', '#4daf4a', '#377eb8', '#999999'],

        //query recency
        open_date_col: 'queryopendate',
        response_date_col: 'queryresponsedate',
        resolved_date_col: 'queryresolveddate',
        recency_category_col: 'open_time',
        recency_col: 'odays',
        recency_cutoffs: [7, 14, 30],

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

        //miscellany
        color_by_col: 'queryage', // options: [ 'queryage' , 'querystatus' ] or any of status_groups[].value_col
        groups: null,
        status_groups: null,
        filters: null,
        dropdown_size: 6,
        details: null,
        bar_arrangement: 'stacked',
        cutoff: 'All',
        alphabetize: true,
        truncate_listing_cells: true,
        truncation_cutoff: 100
    };
}
