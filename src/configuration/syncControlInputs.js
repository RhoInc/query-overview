import syncGroupBy from './syncControlInputs/syncGroupBy';
import syncStatusGroup from './syncControlInputs/syncStatusGroup';
import syncFilters from './syncControlInputs/syncFilters';
import syncShowFirstNGroups from './syncControlInputs/syncShowFirstNGroups';

export default function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = settings.clone(controlInputs);
    syncGroupBy(syncedControlInputs, settings);
    syncStatusGroup(syncedControlInputs, settings);
    syncFilters(syncedControlInputs, settings);
    syncShowFirstNGroups(syncedControlInputs, settings);

    return syncedControlInputs;
}
