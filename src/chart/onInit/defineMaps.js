export default function defineMaps() {
    this.maps = {
        querystatus: d3
            .nest()
            .key(d => d[this.config.status_col])
            .rollup(d => d3.set(d.map(di => di.queryage)).values())
            .map(this.raw_data),
        queryage: d3
            .nest()
            .key(d => d.queryage)
            .rollup(d => d3.set(d.map(di => di[this.config.status_col])).values())
            .map(this.raw_data)
    };
}
