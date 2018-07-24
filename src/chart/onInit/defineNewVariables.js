export default function defineNewVariables() {
    this.raw_data.forEach(d => {
        d['Form: Field'] = d[this.config.form_col] + ': ' + d[this.config.field_col];

        //Define query age category.
        if (!this.config.age_category_order) {
            const queryAge =
                /^ *\d+ *$/.test(d[this.config.age_col]) &&
                ['Closed', 'Cancelled'].indexOf(d[this.config.status_col]) < 0
                    ? +d[this.config.age_col]
                    : NaN;
            switch (true) {
                case queryAge <= 14:
                    d['Query Age Category'] = '0-2 weeks';
                    break;
                case queryAge <= 28:
                    d['Query Age Category'] = '2-4 weeks';
                    break;
                case queryAge <= 56:
                    d['Query Age Category'] = '4-8 weeks';
                    break;
                case queryAge <= 112:
                    d['Query Age Category'] = '8-16 weeks';
                    break;
                case queryAge > 112:
                    d['Query Age Category'] = '>16 weeks';
                    break;
                default:
                    d['Query Age Category'] = d[this.config.status_col];
                    break;
            }
        }
    });
}
