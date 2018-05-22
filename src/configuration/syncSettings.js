import clone from '../util/clone';
import arrayOfVariablesCheck from './functions/arrayOfVariablesCheck';

export default function syncSettings(settings) {
    const syncedSettings = clone(settings);

    //groups
    const defaultGroups = [
        { value_col: syncedSettings.form_col, label: 'Form' },
        { value_col: 'Form: Field', label: 'Form: Field' },
        { value_col: syncedSettings.site_col, label: 'Site' }
    ];
    syncedSettings.groups = arrayOfVariablesCheck(defaultGroups, settings.groups);

    //status_groups
    const defaultStatusGroups = [
        {
            value_col: syncedSettings.status_col,
            label: 'Query Status',
            order: syncedSettings.status_order,
            colors: syncedSettings.status_colors,
        },
        {
            value_col: syncedSettings.aging_col,
            label: 'Query Age',
            order: syncedSettings.aging_order,
            colors: syncedSettings.aging_colors,
        },
    ];
    syncedSettings.status_groups = arrayOfVariablesCheck(defaultStatusGroups, settings.status_groups);

    //y-axis
    syncedSettings.y.column = syncedSettings.form_col;

    //stratification
    syncedSettings.color_by = syncedSettings.status_groups[0].value_col;
    syncedSettings.color_dom = syncedSettings.status_groups[0].order.slice();
    syncedSettings.colors = syncedSettings.status_groups[0].colors;
    syncedSettings.legend.label = syncedSettings.status_groups[0].label;
    syncedSettings.legend.order = syncedSettings.status_groups[0].order.slice();

    //mark settings
    syncedSettings.marks[0].per[0] = syncedSettings.form_col;
    syncedSettings.marks[0].split = syncedSettings.color_by;
    syncedSettings.marks[0].tooltip = `[${syncedSettings.color_by}] - $x queries`;

    //filters
    const defaultFilters = [
        { value_col: syncedSettings.form_col, label: 'Form' },
        { value_col: syncedSettings.site_col, label: 'Site' },
    ];
    syncedSettings.status_groups
        .forEach(status_group => {
            status_group.multiple = true;
            defaultFilters.push(clone(status_group));
        });
    syncedSettings.filters = arrayOfVariablesCheck(defaultFilters, settings.filters);

    //cutoff
    if (!(+syncedSettings.cutoff > 0 || syncedSettings.cutoff === 'All'))
        syncedSettings.cutoff = 10;

    //details
    syncedSettings.details = arrayOfVariablesCheck([], settings.details);
    if (syncedSettings.details.length === 0)
        delete syncedSettings.details;

    return syncedSettings;
}
