export default function setYAxisDomainLength() {
    const context = this;

    var groupToggles = this.controls.wrap
        .selectAll('.control-group')
        .filter(function(d) {
            return d.label == 'Show first N groups';
        })
        .selectAll('input[type="radio"]');
    groupToggles.property('checked', function(d, i) {
        return d == context.config.cutoff;
    });
    this.config.cutoff = this.config.cutoff === 'All' ? this.raw_data.length : +this.config.cutoff;
    groupToggles.on('change', function() {
        var value = groupToggles
            .filter(function(f) {
                return d3.select(this).property('checked');
            })
            .property('value');
        context.config.cutoff = value == 'All' ? context.raw_data.length : +value;
        context.draw();
    });
}
