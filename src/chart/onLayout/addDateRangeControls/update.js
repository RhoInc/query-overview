export default function update(dateRange) {
    const context = this;
    console.log(dateRange.lower);
    console.log(dateRange.upper);

    //update lower slider and annotation
    dateRange.lowerAnnotation.text(d3.time.format(this.config.date_format)(dateRange.lower));

    //update upper slider and annotation
    dateRange.upperAnnotation.text(d3.time.format(this.config.date_format)(dateRange.upper));
}
