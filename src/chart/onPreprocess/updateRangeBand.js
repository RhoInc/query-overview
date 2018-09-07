export default function updateRangeBand() {
    if (this.config.marks[0].arrange === 'stacked') {
        this.config.range_band = 15;
    } else {
        this.config.range_band = 15 * this.config.color_dom.length;
    }
}
