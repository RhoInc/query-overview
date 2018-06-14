import legendFilter from './onResize/legendFilter';
import addYAxisTickTooltips from './onResize/addYAxisTickTooltips';
import addYAxisTickClick from './onResize/addYAxisTickClick';
import hideBars from './onResize/hideBars';
import annotateNumberOfQueries from './onResize/annotateNumberOfQueries';
import addBarClick from './onResize/addBarClick';

export default function onResize() {
    //Add filter functionality to legend.
    legendFilter.call(this);

    //Add y-tick-label tooltips.
    addYAxisTickTooltips.call(this);

    //Plot data by field when viewing data by form and user clicks y-axis tick label.
    addYAxisTickClick.call(this);

    //Hide bars that aren't in first N groups.
    hideBars.call(this);

    //Annotate number of queries.
    annotateNumberOfQueries.call(this);

    //Add bar click-ability.
    addBarClick.call(this);
}
