export default function onDraw(){
    var chart = this
    console.log(this.config.y.column);
    console.log(this.config.marks[0].per);

    this.current_data.sort(function(a,b){
        return b.total < a.total ? -1 : b.total > a.total ? 1 : b.total >= a.total ? 0 : NaN;
    });

    this.y_dom.sort(function(a,b){
        var order = chart.current_data.map(function(d){return d.key});
        return order.indexOf(b) < order.indexOf(a) ? -1 : order.indexOf(b) > order.indexOf(a) ? 1 : order.indexOf(b) >= order.indexOf(a) ? 0 : NaN;
    });

    this.y_dom = this.y_dom.filter(function(d,i){
        return chart.current_data.map(function(d){return d.key}).indexOf(d) > -1
    });

    this.y_dom = this.y_dom.filter(function(d,i){
        return i >= (chart.y_dom.length - chart.config.cutoff)
    });

    this.y_dom = this.config.alphabetize ? this.y_dom.sort(d3.descending): this.y_dom;

    //change chart height to match the current number of bars displayed
    this.raw_height = (+this.config.range_band+(this.config.range_band*this.config.padding))*this.y_dom.length;
}
