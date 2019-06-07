import { descending } from 'd3';

export default function setYDomain() {
    //Sort summarized data by descending total.
    this.current_data.sort((a, b) =>
        b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN
    );

    //Sort y-domain by descending total.
    this.y_dom.sort((a, b) => {
        const order = this.current_data.map(d => d.key);
        return order.indexOf(b) < order.indexOf(a)
            ? -1
            : order.indexOf(b) > order.indexOf(a)
            ? 1
            : order.indexOf(b) >= order.indexOf(a)
            ? 0
            : NaN;
    });

    //Limit y-domain to key values in summarized data.
    this.y_dom = this.y_dom.filter(d => this.current_data.map(di => di.key).indexOf(d) > -1);

    //Sort y-domain alphanumerically or descending total.
    this.y_dom = this.config.alphabetize ? this.y_dom.sort(descending) : this.y_dom;

    //Limit y-domain to first [chart.config.cutoff] values.
    if (this.config.cutoff !== 'All') {
        this.y_dom_length = this.y_dom.length;
        this.y_dom = this.y_dom.filter((d, i) => i >= this.y_dom.length - this.config.cutoff);
    } else {
        this.y_dom_length = this.y_dom.length; // ensure that "X more items" does not appear on Show All
    }
}
