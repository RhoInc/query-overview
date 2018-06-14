import clone from '../util/clone';

export default function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = clone(controlInputs);

    //Group by
    const groupByControl = syncedControlInputs.find(
        controlInput => controlInput.label === 'Group by'
    );
    groupByControl.values = settings.groups.map(group => group.label);

    //Status Group
    const statusGroupControl = syncedControlInputs.find(
        controlInput => controlInput.label === 'Status Group'
    );
    statusGroupControl.values = settings.status_groups.map(status_group => status_group.value_col);

    //filters
    settings.filters.forEach((filter, i) => {
        filter.type = 'subsetter';
        filter.description = 'filter';
        syncedControlInputs.splice(2 + i, 0, filter);
    });

    //Show First N Groups
    const nGroupsControl = syncedControlInputs.find(
        controlInput => controlInput.label === 'Show First N Groups'
    );
    if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
        nGroupsControl.values.push(settings.cutoff.toString());
        nGroupsControl.values.sort((a, b) => (a === 'All' ? 1 : b === 'All' ? -1 : +a - +b));
    } else settings.cutoff = nGroupsControl.values[0];

    return syncedControlInputs;
}
