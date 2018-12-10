export default function truncateCellText() {
    this.tbody
        .selectAll('td')
        .attr('title', d => d.text)
        .filter(d => d.text.length > this.chart.initialSettings.truncation_cutoff)
        .text(d => `${d.text.substring(0, this.chart.initialSettings.truncation_cutoff)}...`);
}
