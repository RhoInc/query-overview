import { select } from 'd3';

export default function updateStratification() {
    const statusGroup = this.controls.wrap
        .selectAll('.qo-radio--status-group')
        .selectAll('.radio')
        .filter(function() {
            const label = select(this);
            const radio = label.select('.changer');
            return radio.property('checked');
        })
        .text();
    this.config.status_group = this.config.status_groups.find(
        status_group => status_group.label === statusGroup
    );
    this.config.marks[0].split = this.config.status_group.value_col;
    this.config.color_by = this.config.status_group.value_col;
    this.config.color_dom = this.config.status_group.order;
    this.config.colors = this.config.status_group.colors;
    this.config.legend.label = this.config.status_group.label;
    this.config.legend.order = this.config.color_dom.slice();
    this.config.marks[0].tooltip = `[${this.config.color_by}] - $x queries`;
}
