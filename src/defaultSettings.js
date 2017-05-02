import clone from './util/clone';

export default {
  //custom settings
  form_col: 'form',
  field_col: 'field',
  status_col: 'status',
  status_order:
    ['Open'
    ,'Answered'
    ,'Closed'
    ,'Cancelled'],
  filters: null,
  details: null,
  groups: null,
  cutoff: 10,
  alphabetize: false,   

  //webcharts settings
  'x': {
    'label': '# of Queries',
    'behavior': 'flex'
  } ,
  'y': {
    'type': 'ordinal',
    'column': 'Form',
    'sort': 'total-descending',
  },
  'marks': [
    {
      'type': 'bar',
      'per': ['Form'],
      'split': 'Status',
      'arrange': 'stacked',
      'summarizeX': 'count',
      'tooltip': '[Status] - $x queries'
    }
  ],
  color_by: 'Status',
  color_dom: null, // set in syncSettings()
  legend: {
    location: 'top',
    label: 'Query Status',
    order: null // set in syncSettings()
  },
  range_band: 15,
  margin: {'right': '50'} // room for count annotation
};

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    const
        syncedSettings = clone(settings),
        groups =
            [{value_col: settings.form_col, label: 'Form'},
            ,{value_col: settings.field_col, label: 'Field'},
            ,{value_col: settings.status_col, label: 'Status'},
            ,{value_col: 'Form: Field', label: 'Form: Field'}];

    syncedSettings.color_dom = syncedSettings.status_order;
    syncedSettings.legend.order = syncedSettings.status_order;

  //Merge default group settings with custom group settings.
    if (syncedSettings.groups)
        syncedSettings.groups
            .forEach(group => groups.push(
                {value_col: group.value_col || group
                ,label: group.label || group.value_col || group}));
    syncedSettings.groups = groups;

  //Add filters to group-by control.
    if (syncedSettings.filters) {
        syncedSettings.filters
            .forEach(filter => {
                const value_col = filter.value_col || filter;
                const label = filter.label || filter.value_col || filter;
                if (syncedSettings.groups.map(d => d.value_col).indexOf(value_col) === -1)
                    syncedSettings.groups.push(
                        {value_col: value_col
                        ,label: label});
            });
    }

  //Format details argument.
    if (Array.isArray(syncedSettings.details && syncedSettings.details && syncedSettings.details.length))
        syncedSettings.details = syncedSettings.details
            .map(detail => {
                const detailObject = {};
                detailObject.value_col = detail.value_col || detail;
                detailObject.label = detail.label || detailObject.value_col;
                console.log(detailObject);

                return detailObject;
            });
    else
        syncedSettings.details = null;

    return syncedSettings;
}

// Default Control objects
export const controlInputs =
    [
        {type: 'dropdown'
        ,options:
            ['y.column'
            ,'y.label'
            ,'marks.0.per.0']
        ,label: 'Group by'
        ,description: 'variable toggle'
        ,values: [] // set in syncControlInputs
        ,require: true}
    ,
        {type: 'subsetter'
        ,value_col: 'Form'
        ,label: 'Form'
        ,description: 'filter'}
    ,
        {type: 'subsetter'
        ,value_col: 'Status'
        ,label: 'Status'
        ,description: 'filter'
        ,multiple: true}
    ,
        {type: 'radio'
        ,option: 'marks.0.arrange'
        ,label: 'Bar Arrangement'
        ,values:
            ['stacked'
            ,'grouped']}
    ,
        {type: 'radio'
        ,option: 'cutoff'
        ,label: 'Show first N groups'
        ,values: ['10', '25','All']}
    ,
        {type: 'checkbox'
        ,option: 'alphabetize'
        ,label: 'Alphabetical?'}
    ];

// Map values from settings to control inputs
export function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = clone(controlInputs);

  //Add groups to group-by control values.
    const groupByControl = syncedControlInputs
        .filter(controlInput => controlInput.label === 'Group by')[0];
    settings.groups
        .forEach(group => groupByControl.values.push(group.label));

  //Add filters to control inputs and group-by control values.
    if (settings.filters) {
        const filters = clone(settings.filters);
        filters.reverse()
            .forEach(filter => {
              //Define filter and add to control inputs.
                const filterObject = {};
                filterObject.type = 'subsetter';
                filterObject.value_col = filter.value_col || filter;
                filterObject.label = filter.label || filter.value_col;
                filterObject.description = 'filter';
                syncedControlInputs.splice(2,0,filterObject);
            });
    }

    return syncedControlInputs;
}
