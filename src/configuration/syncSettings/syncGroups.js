export default function syncGroups(settings) {
    const defaultGroups = [
        { value_col: settings.form_col, label: 'Form' },
        { value_col: 'Form: Field', label: 'Form: Field' },
        { value_col: settings.site_col, label: 'Site' },
        { value_col: settings.marking_group_col, label: 'Marking Group' },
        { value_col: settings.visit_col, label: 'Visit/Folder' }
    ];
    settings.groups = settings.arrayOfVariablesCheck(defaultGroups, settings.groups);
}
