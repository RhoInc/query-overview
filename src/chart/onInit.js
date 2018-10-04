import defineListingSettings from './onInit/defineListingSettings';
import defineNewVariables from './onInit/defineNewVariables';
import defineQueryStatuses from './onInit/defineQueryStatuses';
import defineQueryAgeCategories from './onInit/defineQueryAgeCategories';
import removeInvalidControls from './onInit/removeInvalidControls';

export default function onInit() {
    //Define new variables.
    defineNewVariables.call(this);

    //Define query statuses.
    defineQueryStatuses.call(this);

    //Define query age categories.
    defineQueryAgeCategories.call(this);

    //Define detail listing settings.
    defineListingSettings.call(this);

    //hide controls that do not have their variable supplied
    removeInvalidControls.call(this);

    //Initialize listing.
    this.listing.init(this.raw_data);
}
