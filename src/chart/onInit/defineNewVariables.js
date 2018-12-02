export default function defineNewVariables() {
    const queryAgeCol = this.config.status_groups.find(
        status_group => status_group.label === 'Query Age'
    ).value_col;
    const queryRecencyCol = this.config.filters.find(filter => filter.label === 'Query Recency')
        .value_col;

    this.raw_data.forEach(d => {
        //Concatenate form and field to avoid duplicates across forms.
        d['Form: Field'] = d[this.config.form_col] + ': ' + d[this.config.field_col];

        //Define query age.
        if (this.config.age_statuses.indexOf(d[this.config.status_col]) < 0)
            d[queryAgeCol] = d[this.config.status_col];
        else {
            const age = +d[this.config.age_col];
            this.config.ageRanges.forEach((ageRange, i) => {
                if (i === 0 && ageRange[0] <= age && age <= ageRange[1])
                    d[queryAgeCol] = this.config.ageRangeCategories[i];
                else if (i === this.config.ageRanges.length - 1 && ageRange[0] < age)
                    d[queryAgeCol] = this.config.ageRangeCategories[i];
                else if (ageRange[0] < age && age <= ageRange[1])
                    d[queryAgeCol] = this.config.ageRangeCategories[i];
            });
        }

        //Define query recency.
        const recency = +d[this.config.recency_col];
        this.config.recencyRanges.forEach((recencyRange, i) => {
            if (i === 0 && recencyRange[0] <= recency && recency <= recencyRange[1])
                d[queryRecencyCol] = this.config.recencyRangeCategories[i];
            else if (i === this.config.recencyRanges.length - 1 && recencyRange[0] < recency)
                d[queryRecencyCol] = this.config.recencyRangeCategories[i];
            else if (recencyRange[0] < recency && recency <= recencyRange[1])
                d[queryRecencyCol] = this.config.recencyRangeCategories[i];
        });
    });
}
