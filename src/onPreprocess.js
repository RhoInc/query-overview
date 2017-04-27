export default function onPreprocess() {
    var chart = this;

  //Change rangeBand() depending on bar arrangement.
    let max = 0;
    let test = d3.nest()
        .key(d => d[this.config.y.column])
        .key(d => d[this.config.color_by])
        .rollup(d => {
            max = Math.max(max, d.length);
            return d.length; })
        .entries(this.raw_data);
    if (this.config.marks[0].arrange === 'stacked') {
        this.config.range_band = 15;
        this.config.x.domain = [0,null];
    } else {
        this.config.range_band = 60;
        this.config.x.domain = [0,max];
    }
}
