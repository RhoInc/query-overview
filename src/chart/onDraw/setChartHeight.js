export default function setChartHeight() {
    //Match chart height to number of bars currently displayed.
    this.raw_height =
        (+this.config.range_band + this.config.range_band * this.config.padding) *
        this.y_dom.length;
}
