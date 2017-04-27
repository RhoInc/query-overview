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
    'column': null,
    'label': 'Form',
    'sort': 'total-descending',
  },
  'marks': [
    {
      'type': 'bar',
      'per': [null],
      'split': null,
      'arrange': 'stacked',
      'summarizeX': 'count',
      'tooltip': null
    },
    {      
      'type': 'text',
      'per': [null],
      'summarizeX': 'count',
      'text': '$x',
      'attributes': {'dx': '0.25em', 'dy': '.25em'}
    }
  ],
  color_by: null,
  legend: {
    location: 'top',
    label: 'Query Status'},
  range_band: 15,
  margin: {'right': '50'} // room for count annotation
};

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    const syncedSettings = clone(settings);

    syncedSettings.y.column = syncedSettings.form_col;
    syncedSettings.marks[0].per[0] = syncedSettings.form_col;
    syncedSettings.marks[0].split = syncedSettings.status_col
    syncedSettings.marks[0].tooltip = syncedSettings.status_col
        ? '['+syncedSettings.status_col+'] - $x queries'
        : '$x queries';
    syncedSettings.marks[1].per[0] = syncedSettings.form_col;
    syncedSettings.color_by = syncedSettings.status_col
    syncedSettings.color_dom = syncedSettings.status_order;
    syncedSettings.legend.order = syncedSettings.status_order;

    return syncedSettings;
}

// Default Control objects
export const controlInputs =
    [
        {type: 'subsetter'
        ,value_col: null
        ,label: 'Form'
        ,description: 'filter'}
    ,
        {type: 'subsetter'
        ,value_col: null
        ,label: 'Status'
        ,description: 'filter'
        ,multiple: true}
    ,
        {type: 'dropdown'
        ,options:
            ['y.column'
            ,'marks.0.per.0'
            ,'marks.1.per.0']
        ,label: 'Group by'
        ,description: 'variable toggle'
        ,values: null
        ,require: true}
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

    syncedControlInputs.filter(controlInput => controlInput.label === 'Form')[0].value_col = settings.form_col;
    syncedControlInputs.filter(controlInput => controlInput.label === 'Status')[0].value_col = settings.status_col;

    const groupByControl = syncedControlInputs
        .filter(controlInput => controlInput.label === 'Group by')[0];

    groupByControl.values =
        [settings.form_col
        ,settings.field_col
        ,settings.status_col
        ,'Form: Field'];
    groupByControl.relabels =
        ['Form'
        ,'Field'
        ,'Status'
        ,'Form: Field'];

  //Add filters to control inputs and group-by control values.
    if (settings.filters) {
        const filters = clone(settings.filters);
        filters.reverse()
            .forEach(filter => {
              //Define filter and add to control inputs.
                filter.type = 'subsetter';
                filter.value_col = filter.value_col || filter;
                filter.label = filter.label || filter;
                filter.description = 'filter';
                syncedControlInputs.splice(1,0,filter);

              //Add filter variable to group-by control values.
                groupByControl.values.push(filter.value_col || filter)
                groupByControl.relabels.push(filter.label || filter)
            });
    }

  //Add groups to group-by control values.
    if (settings.groups)
        settings.groups
            .forEach(group => {
                groupByControl.values.push(group.value_col || group);
                groupByControl.relabels.push(group.label || group);
            });

    return syncedControlInputs;
}
