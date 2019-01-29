import defineListingSettings from './onInit/defineListingSettings';
import defineNewVariables from './onInit/defineNewVariables';
import defineQueryStatusSet from './onInit/defineQueryStatusSet';
import defineQueryRecencySet from './onInit/defineQueryRecencySet';
import removeInvalidControls from './onInit/removeInvalidControls';

export default function onInit() {
    //Define new variables.
    defineNewVariables.call(this);

    //Define query statuses.
    defineQueryStatusSet.call(this);

    //Define query recency categories.
    defineQueryRecencySet.call(this);

    //Define detail listing settings.
    defineListingSettings.call(this);

    //hide controls that do not have their variable supplied
    removeInvalidControls.call(this);

    //Initialize listing.
    this.listing.init(this.raw_data);
}
