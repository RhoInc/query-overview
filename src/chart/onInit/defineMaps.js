import { nest, set } from 'd3';

export default function defineMaps() {
    this.maps = {
        querystatus: nest()
            .key(d => d[this.config.status_col])
            .rollup(d => set(d.map(di => di.queryage)).values())
            .map(this.raw_data),
        queryage: nest()
            .key(d => d.queryage)
            .rollup(d => set(d.map(di => di[this.config.status_col])).values())
            .map(this.raw_data)
    };
}
