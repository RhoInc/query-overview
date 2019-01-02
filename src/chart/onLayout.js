import classControls from './onLayout/classControls';
import groupControls from './onLayout/groupControls';
import addControlTooltips from './onLayout/addControlTooltips';
import updateGroupByOptions from './onLayout/updateGroupByOptions';
import customizeMultiSelects from './onLayout/customizeMultiSelects';
import addSelectAll from './onLayout/addSelectAll';
import updateFilterEventListeners from './onLayout/updateFilterEventListeners';
import sortQueryRecencyOptions from './onLayout/sortQueryRecencyOptions';
import setYAxisDomainLength from './onLayout/setYAxisDomainLength';
import addResetButton from './onLayout/addResetButton';
import clearListingOnChange from './onLayout/clearListingOnChange';
import addFootnotes from './onLayout/addFootnotes';

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

    //Add select all checkbox to filters.
    addSelectAll.call(this);

    //Update filter event listeners to toggle select all checkbox on change.
    updateFilterEventListeners.call(this);

    //Sort query recency categories numerically if possible.
    sortQueryRecencyOptions.call(this);

    //Handle y-domain length control
    setYAxisDomainLength.call(this);

    //Add reset button.
    addResetButton.call(this);

    //Clear listing when controls change.
    clearListingOnChange.call(this);

    //Add chart footnotes.
    addFootnotes.call(this);
}
