import { max } from 'd3';

export default function setLeftMargin() {
    const fontSize = parseInt(this.wrap.style('font-size'));
    this.config.margin.left = Math.max(
        Math.max(7, max(this.y_dom, d => d.length)) * fontSize * 0.5 + fontSize * 1.5 * 1.5 + 6,
        100
    );
}
