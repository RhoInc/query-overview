export default function onLayout() {
    var chart = this

  //Handle y-domain length control
    var groupToggles = this.controls.wrap
        .selectAll(".control-group")
        .filter(function(d){return d.label=="Show first N groups"})
        .selectAll('input[type="radio"]')
    groupToggles.property('checked',function(d,i){return d==10})
    groupToggles.on('change', function(){
        var value = groupToggles.filter(function(f){return d3.select(this).property('checked')}).property('value');
        chart.config.cutoff = value == "All" ? chart.raw_data.length : +value;
        chart.draw()
    });

  //Sync status filter with legend items.
    const
        statusFilter = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.label === 'Status');
    statusFilter
        .on('change', function() {
            const
                selectedOptions = statusFilter
                    .select('.changer')
                    .selectAll('option:checked')
                    .data(), // selected statuses
                legendItems = chart.wrap
                    .selectAll('.legend-item')
                    .classed('selected', false), // de-select all legend items
                selectedLegendItems = legendItems
                    .filter(d => selectedOptions.indexOf(d.label) > -1)
                    .classed('selected', true); // sync legend items with status options
                legendItems
                    .each(function() {
                        const
                            legendItem = d3.select(this),
                            selected = legendItem.classed('selected');
                        legendItem
                            .style(
                                {'background': selected ? 'lightgray' : 'white'});
                    });
        });
}
