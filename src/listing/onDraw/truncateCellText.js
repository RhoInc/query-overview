export default function truncateCellText() {
    if (this.data.raw.length)
        this.tbody
            .selectAll('td')
            .attr('title', d => d.text)
            .filter(d => d.text.length > this.initialSettings.truncation_cutoff)
            .text(d => `${d.text.substring(0, this.initialSettings.truncation_cutoff)}...`);
}
