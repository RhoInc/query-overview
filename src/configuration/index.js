import rendererSettings from './rendererSettings';
import chartSettings from './chartSettings';
import listingSettings from './listingSettings';
import syncSettings from './syncSettings';
import controlInputs from './controlInputs';
import syncControlInputs from './syncControlInputs';

export default {
    rendererSettings,
    chartSettings,
    listingSettings,
    settings: Object.assign({}, rendererSettings(), chartSettings(), listingSettings()),
    syncSettings,
    controlInputs,
    syncControlInputs
};
