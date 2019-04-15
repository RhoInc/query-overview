export default function manualSort() {
    const context = this;

    this.data.manually_sorted = this.data.raw.sort((a, b) => {
        let order = 0;

        this.sortable.order.forEach(item => {
            const aCell = a[item.col];
            const bCell = b[item.col];
            if (
                item.col !== context.initialSettings.age_col &&
                item.col !== context.initialSettings.recency_col
            ) {
                if (order === 0) {
                    if (
                        (item.direction === 'ascending' && aCell < bCell) ||
                        (item.direction === 'descending' && aCell > bCell)
                    )
                        order = -1;
                    else if (
                        (item.direction === 'ascending' && aCell > bCell) ||
                        (item.direction === 'descending' && aCell < bCell)
                    )
                        order = 1;
                }
            } else {
                if (order === 0) {
                    if (
                        (item.direction === 'ascending' && +aCell < +bCell) ||
                        (item.direction === 'descending' && +aCell > +bCell)
                    )
                        order = -1;
                    else if (
                        (item.direction === 'ascending' && +aCell > +bCell) ||
                        (item.direction === 'descending' && +aCell < +bCell)
                    )
                        order = 1;
                }
            }
        });

        return order;
    });
    this.draw(this.data.manually_sorted);
}
