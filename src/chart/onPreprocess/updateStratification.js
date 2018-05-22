import { set } from 'd3';

export default function updateStratification() {
    const stratification = this.config.status_groups
        .find(status_group => status_group.value_col === this.config.color_by);
    this.config.color_dom = stratification.order || set(this.raw_data.map(d => d[this.config.color_by])).values().sort();
    this.config.colors = stratification.colors;
    this.config.legend.label = stratification.label;
    this.config.legend.order = this.config.color_dom.slice();
    this.config.marks[0].tooltip = `[${this.config.color_by}] - $x queries`;
}
