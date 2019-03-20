export default function filter() {
    this.raw_data = this.initial_data;
    for (const prop in this.controls.dateRanges) {
        const dateRange = this.controls.dateRanges[prop];
        this.raw_data = this.raw_data.filter(d => {
            const date = d[dateRange.dateVariable];
            return dateRange.includeMissing
                ? date === null ||
                      (dateRange.lower.getTime() <= date.getTime() &&
                          date.getTime() <= dateRange.upper.getTime())
                : date !== null &&
                      (dateRange.lower.getTime() <= date.getTime() &&
                          date.getTime() <= dateRange.upper.getTime());
        });
    }
}
