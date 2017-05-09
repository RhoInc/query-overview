export default function onInit() {
  var chart = this;

  //Define detail listing settings.
  this.listing.config.cols = this.config.details
    ? this.config.details.map(d => d.value_col)
    : Object.keys(this.raw_data[0]);
  this.listing.config.headers = this.config.details
    ? this.config.details.map(d => d.label)
    : Object.keys(this.raw_data[0]);
  if (!this.config.details) {
    //this.listing.config.headers[
    //  this.listing.config.headers.indexOf(this.config.form_col)
    //] =
    //  "Form";
    //this.listing.config.headers[
    //  this.listing.config.headers.indexOf(this.config.field_col)
    //] =
    //  "Field";
    //this.listing.config.headers[
    //  this.listing.config.headers.indexOf(this.config.status_col)
    //] =
    //  "Status";
  }

  //Define new variables.
  this.raw_data.forEach(function(d) {
    d["Form: Field"] =
      d[chart.config.form_col] + ": " + d[chart.config.field_col];
  });
}
