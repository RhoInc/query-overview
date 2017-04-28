export default function onInit(){
    var chart = this

  //Define new variables.
    this.raw_data.forEach(function(d){
        d['Form: Field'] = d[chart.config.form_col] + ": "+d[chart.config.field_col]

      //Redefine group-by variables with their labels.
        chart.config.groups
            .forEach(group => {
                if (group.value_col !== group.label) {
                    d[group.label] = d[group.value_col];
                    delete d[group.value_col];
                }
            });
    });
};
