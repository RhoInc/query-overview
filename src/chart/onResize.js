import legendFilter from './onResize/legendFilter';
import addYAxisTickTooltips from './onResize/addYAxisTickTooltips';
import addYAxisTickClick from './onResize/addYAxisTickClick';
import annotateYAxisInfo from './onResize/annotateYAxisInfo';
import hideBars from './onResize/hideBars';
import annotateNumberOfQueries from './onResize/annotateNumberOfQueries';
import addBarClick from './onResize/addBarClick';
import addBarDeselection from './onResize/addBarDeselection';
import addNoDataIndicator from './onResize/addNoDataIndicator';

export default function onResize() {
    //Add filter functionality to legend.
    legendFilter.call(this);

    //Add y-tick-label tooltips.
    addYAxisTickTooltips.call(this);

    //Plot data by field when viewing data by form and user clicks y-axis tick label.
    addYAxisTickClick.call(this);

    //Annotate the number of hidden y-axis tick labels.
    annotateYAxisInfo.call(this);

    //Hide bars that aren't in first N groups.
    hideBars.call(this);

    //Annotate number of queries.
    annotateNumberOfQueries.call(this);

    //Add bar click-ability.
    addBarClick.call(this);

    //Add bar deselection.
    addBarDeselection.call(this);

    //Add informational text to the chart canvas when filters are in conflict.
    addNoDataIndicator.call(this);
}
