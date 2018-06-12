import clone from './util/clone';

export const rendererSpecificSettings = {
    form_col: 'Datastr',
    formDescription_col: 'Form',
    field_col: 'Field Name',
    fieldDescription_col: 'Field',
    status_col: 'Query Status',
    status_order: ['Open', 'Answered', 'Closed', 'Cancelled'],
    site_col: 'Site Name',
    groups: null,
    filters: null,
    details: null,
    cutoff: 10,
    alphabetize: false,
    exportable: true,
    nRowsPerPage: 10
};

export const webchartsSettings = {
    x: {
        label: '# of Queries',
        behavior: 'flex'
    },
    y: {
        type: 'ordinal',
        column: null, // set in syncSettings()
        label: 'Form',
        sort: 'total-descending'
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
        label: 'Query Status',
        order: null // set in syncSettings()
    },
    range_band: 15,
    margin: { right: '50' } // room for count annotation
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    const syncedSettings = clone(settings),
        groups = [
            { value_col: settings.form_col, label: 'Form' },
            { value_col: 'Form: Field', label: 'Form: Field' },
            { value_col: settings.status_col, label: 'Status' },
            { value_col: settings.site_col, label: 'Site' }
        ];

    syncedSettings.y.column = syncedSettings.form_col;
    syncedSettings.marks[0].per[0] = syncedSettings.form_col;
    syncedSettings.marks[0].split = syncedSettings.status_col;
    syncedSettings.marks[0].tooltip = `[${syncedSettings.status_col}] - $x queries`;
    syncedSettings.color_by = syncedSettings.status_col;
    syncedSettings.color_dom = syncedSettings.status_order;
    syncedSettings.legend.order = syncedSettings.status_order;

    //Merge default group settings with custom group settings.
    if (syncedSettings.groups)
        syncedSettings.groups.forEach(group => {
            if (
                groups
                    .map(defaultGroup => defaultGroup.value_col)
                    .indexOf(group.value_col || group) === -1
            )
                groups.push({
                    value_col: group.value_col || group,
                    label: group.label || group.value_col || group
                });
        });
    syncedSettings.groups = groups;

    //Add filters to group-by control.
    if (syncedSettings.filters) {
        syncedSettings.filters.forEach(filter => {
            const value_col = filter.value_col || filter;
            const label = filter.label || filter.value_col || filter;
            if (syncedSettings.groups.map(d => d.value_col).indexOf(value_col) === -1)
                syncedSettings.groups.push({
                    value_col: value_col,
                    label: label
                });
        });
    }

    //Format details argument.
    if (
        Array.isArray(syncedSettings.details) &&
        syncedSettings.details &&
        syncedSettings.details.length
    )
        syncedSettings.details = syncedSettings.details.map(detail => {
            const detailObject = {};
            detailObject.value_col = detail.value_col || detail;
            detailObject.label = detail.label || detailObject.value_col;

            return detailObject;
        });
    else syncedSettings.details = null;

    //Check cutoff argument and set to 10 if invalid.
    if (!(+syncedSettings.cutoff > 0 || syncedSettings.cutoff === 'All'))
        syncedSettings.cutoff = 10;

    return syncedSettings;
}

// Default Control objects
export const controlInputs = [
    {
        type: 'dropdown',
        option: 'y.label',
        label: 'Group by',
        description: 'variable toggle',
        values: [], // set in syncControlInputs
        require: true
    },
    {
        type: 'subsetter',
        value_col: null, // set in syncControlInputs()
        label: 'Form',
        description: 'filter',
        multiple: true
    },
    {
        type: 'subsetter',
        value_col: null, // set in syncControlInputs()
        label: 'Status',
        description: 'filter',
        multiple: true
    },
    {
        type: 'subsetter',
        value_col: null, // set in syncControlInputs()
        label: 'Site',
        description: 'filter',
        multiple: true
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
        label: 'Show first N groups',
        values: ['10', '25', 'All']
    },
    {
        type: 'checkbox',
        option: 'alphabetize',
        label: 'Alphabetical?'
    }
];

// Map values from settings to control inputs
export function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = clone(controlInputs);

    //Add groups to group-by control values.
    const groupByControl = syncedControlInputs.filter(
        controlInput => controlInput.label === 'Group by'
    )[0];
    settings.groups.forEach(group => groupByControl.values.push(group.label));

    //Set value_col of Form filter.
    syncedControlInputs.filter(controlInput => controlInput.label === 'Form')[0].value_col =
        settings.form_col;

    //Set value_col of Site filter.
    syncedControlInputs.filter(controlInput => controlInput.label === 'Site')[0].value_col =
        settings.site_col;

    //Add filters to control inputs and group-by control values.
    if (settings.filters) {
        const filters = clone(settings.filters);
        filters.reverse().forEach(filter => {
            //Define filter and add to control inputs.
            const filterObject = {};
            filterObject.type = 'subsetter';
            filterObject.value_col = filter.value_col || filter;
            filterObject.label = filter.label || filter.value_col;
            filterObject.description = 'filter';
            syncedControlInputs.splice(2, 0, filterObject);
        });
    }

    //Set value_col of Status filter.
    syncedControlInputs.filter(controlInput => controlInput.label === 'Status')[0].value_col =
        settings.status_col;

    //Add cutoff argument to Show first N groups control if not already a default value.
    const nGroupsControl = syncedControlInputs.filter(
        controlInput => controlInput.label === 'Show first N groups'
    )[0];
    if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
        nGroupsControl.values.push(settings.cutoff.toString());
        nGroupsControl.values.sort((a, b) => (a === 'All' ? 1 : b === 'All' ? -1 : +a - +b));
    }

    return syncedControlInputs;
}
