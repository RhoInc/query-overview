export default function defineQueryRecencySet() {
    const queryRecencyInput = this.controls.config.inputs.find(
        input => input.value_col === 'queryrecency'
    );

    if (this.raw_data[0].hasOwnProperty(this.config.recency_category_col)) {
        queryRecencyInput.values = d3
            .set(this.raw_data.map(d => d.queryrecency))
            .values()
            .sort((a,b) => {
                const anum = parseFloat(a);
                const bnum = parseFloat(b);
                const diff = anum - bnum;
                return diff ? diff : a < b ? -1 : a > b ? 1 : 0;
            });
    } else if (this.raw_data[0].hasOwnProperty(this.config.recency_col))
        queryRecencyInput.values = this.config.recencyRangeCategories
    else
        this.controls.config.inputs
            .splice(
                this.controls.config.inputs
                    .findIndex(input => input.value_col === 'queryrecency'),
                1
            );
}
