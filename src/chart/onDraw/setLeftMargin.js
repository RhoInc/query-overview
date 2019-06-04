import { max } from 'd3';

export default function setLeftMargin() {
    this.config.fontSize = parseInt(this.wrap.style('font-size'));
    console.log(this.config.fontSize);

    //Give the y-axis tick labels a maximum margin of one quarter of the container width.
    this.config.maxYAxisTickWidth = this.div.offsetWidth / 4;

    //Find maximum number of characters in the y-axis tick labels (minimum: 7 characters).
    this.config.maxYAxisTickLabelLength =
        Math.max(7, max(this.y_dom, d => d.length)) * this.config.fontSize * 0.5 +
        this.config.fontSize * 1.5 * 1.5 +
        6;

    //Set the left margin to the minimum of one quarter of the container width and the maximum number of characters in the y-axis tick labels (minimum: 100 pixels).
    this.config.margin.left = Math.min(
        this.config.maxYAxisTickWidth,
        Math.max(this.config.maxYAxisTickLabelLength, 100)
    );
}
