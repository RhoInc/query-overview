export default function onInit(){
    var chart = this
    this.raw_data.forEach(function(d){
        d['Form: Field'] = d[chart.config.form_col] + ": "+d[chart.config.field_col]
        if (chart.config.groups)
            chart.config.groups.forEach(group => d[group.label] = d[group.value_col]);
    });
};
