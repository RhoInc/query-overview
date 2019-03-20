import layout from './addDateRangeControls/layout';
import update from './addDateRangeControls/update';
import listen from './addDateRangeControls/listen';

export default function addDateRangeControls() {
    this.controls.dateRanges = {
        open: {},
        response: {},
        resolved: {}
    };
    for (const date in this.controls.dateRanges) {
        const dateRange = this.controls.dateRanges[date];
        dateRange.property = date;
        dateRange.setting = `${date}_date_col`;
        dateRange.variable = this.config[dateRange.setting];
        dateRange.dateVariable = `qo_${date}_date`;
        dateRange.label = `${date.substring(0, 1).toUpperCase()}${date
            .substring(1)
            .toLowerCase()} Date`;
        dateRange.includeMissing = true;
        dateRange.variableExists = this.variables.indexOf(dateRange.variable) > -1;
        if (dateRange.variableExists) {
            dateRange.range = d3.extent(this.raw_data, d => d[dateRange.dateVariable]);
            dateRange.lower = dateRange.range[0];
            dateRange.upper = dateRange.range[1];
            layout.call(this, dateRange);
            update.call(this, dateRange);
            listen.call(this, dateRange);
        }
    }
}
