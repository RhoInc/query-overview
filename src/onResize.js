export default function onResize(){
   var chart = this;
  var textMarks = d3.select("g.text-supergroup").selectAll("text")
  .attr("display",function(d,i){
    return chart.y_dom.indexOf(d.key)>-1 ? null : "none" 
  })   
  var bars = d3.select("g.bar-supergroup").selectAll("g.bar-group")
  .attr("display",function(d,i){return chart.y_dom.indexOf(d.key) >-1 ? null : "none" })

}
