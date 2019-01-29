import clone from '../util/clone';
import arrayOfVariablesCheck from './syncSettings/arrayOfVariablesCheck';
import syncGroups from './syncSettings/syncGroups';
import syncStatusGroups from './syncSettings/syncStatusGroups';
import syncWebchartsSettings from './syncSettings/syncWebchartsSettings';
import syncFilters from './syncSettings/syncFilters';
import syncCutoff from './syncSettings/syncCutoff';
import syncDetails from './syncSettings/syncCutoff';

export default function syncSettings(settings) {
    const syncedSettings = Object.assign({}, clone(settings), { clone, arrayOfVariablesCheck });
    syncGroups(syncedSettings);
    syncStatusGroups(syncedSettings);
    syncWebchartsSettings(syncedSettings);
    syncFilters(syncedSettings);
    syncCutoff(syncedSettings);
    syncDetails(syncedSettings);

    return syncedSettings;
}
