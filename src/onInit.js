export default function onInit(){
 this.raw_data.forEach(function(d){
    d.FormField = d[this.config.form_col] + ": "+d[this.config.field_col]
  })
};