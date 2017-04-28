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
}
