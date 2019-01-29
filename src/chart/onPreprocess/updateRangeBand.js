export default function updateRangeBand() {
    if (this.config.marks[0].arrange === 'stacked') {
        this.config.range_band = this.initialSettings.range_band;
    } else {
        this.config.range_band = this.initialSettings.range_band * this.config.color_dom.length;
    }
}
