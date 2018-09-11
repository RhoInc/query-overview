import updateGroupByOptions from './onLayout/updateGroupByOptions';
import customizeMultiSelects from './onLayout/customizeMultiSelects';
import setYAxisDomainLength from './onLayout/setYAxisDomainLength';
import addResetButton from './onLayout/addResetButton';
import clearListingOnChange from './onLayout/clearListingOnChange';
import addListingInstruction from './onLayout/addListingInstruction';
import removeInvalidControls from './onLayout/removeInvalidControls';

export default function onLayout() {
    //Display group label rather than group column name in Group by control.
    updateGroupByOptions.call(this);

    //Customize dropdowns with multiple options.
    customizeMultiSelects.call(this);

    //Handle y-domain length control
    setYAxisDomainLength.call(this);

    //Add reset button.
    addResetButton.call(this);

    //Clear listing when controls change.
    clearListingOnChange.call(this);

    //Add listing instruction.
    addListingInstruction.call(this);

    //hide controls that do not have their variable supplied
    removeInvalidControls.call(this);
}
