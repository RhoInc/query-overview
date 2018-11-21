import classControls from './onLayout/classControls';
import groupControls from './onLayout/groupControls';
import addControlTooltips from './onLayout/addControlTooltips';
import updateGroupByOptions from './onLayout/updateGroupByOptions';
import customizeMultiSelects from './onLayout/customizeMultiSelects';
import setYAxisDomainLength from './onLayout/setYAxisDomainLength';
import addResetButton from './onLayout/addResetButton';
import clearListingOnChange from './onLayout/clearListingOnChange';
import addListingInstruction from './onLayout/addListingInstruction';

export default function onLayout() {
    //Class controls for unique selection.
    classControls.call(this);

    //Group controls logically.
    groupControls.call(this);

    //Add tooltips to controls.
    addControlTooltips.call(this);

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
}
