export default function onInit(){
    var chart = this
    this.raw_data.forEach(function(d){
        d.FormField = d[chart.config.form_col] + ": "+d[chart.config.field_col]
    });
};
