export default function onDataTransform() {
    var chart = this;

    if (this.config.marks[0].arrange === 'stacked') {
        this.config.range_band = 15;
    } else {
        this.config.range_band = 30;
    }
}
