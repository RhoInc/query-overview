export default function layout(element) {
    const containers = {
        main: d3
            .select(element)
            .append('div')
            .classed('.query-overview', true)
    };

    containers.topRow = containers.main.append('div').classed('qo-row qo-row--top', true);
    containers.controls = containers.topRow
        .append('div')
        .classed('qo-component qo-component--controls', true);
    containers.chart = containers.topRow
        .append('div')
        .classed('qo-component qo-component--chart', true);
    containers.bottomRow = containers.main.append('div').classed('qo-row qo-row--bottom', true);
    containers.listing = containers.bottomRow
        .append('div')
        .classed('qo-component qo-component--listing', true);

    return containers;
}
