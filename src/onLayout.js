export default function onLayout(){
 var chart = this
  this.controls.wrap
  .selectAll(".control-group")
  .filter(function(d){return d.label=="Group By"})
  .selectAll("select")
  .on("change", function(){
    var value = d3.select(this).property("value");
    chart.config.marks[0].per[0]=value
    chart.config.marks[1].per[0]=value
    chart.config.y.column=value
    chart.draw()
  })
  

  var groupToggles = this.controls.wrap
  .selectAll(".control-group")
  .filter(function(d){return d.label=="Show first N results"})
  .selectAll('input[type="radio"]')

  groupToggles.property('checked',function(d,i){return d==10})

  groupToggles.on('change', function(){

      var value = groupToggles.filter(function(f){return d3.select(this).property('checked')}).property('value');
      console.log(value)
      chart.config.cutoff = value == "All" ? chart.raw_data.length : +value;
      chart.draw()
  })
}
