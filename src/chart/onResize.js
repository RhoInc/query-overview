import flatMap from '../util/flatMap';
import legendFilter from './onResize/legendFilter';

export default function onResize() {
    const context = this;

    //Hide bars that aren't in first N groups.
    this.svg
        .select('g.bar-supergroup')
        .selectAll('g.bar-group')
        .attr('display', function(d, i) {
            return context.y_dom.indexOf(d.key) > -1 ? null : 'none';
        });

    //Annotate # of Queries.
    this.svg.selectAll('.number-of-queries').remove();
    if (this.config.marks[0].arrange === 'stacked') {
        this.current_data.forEach(d => {
            if (context.y_dom.indexOf(d.key) > -1) {
                context.svg
                    .append('text')
                    .classed('number-of-queries', true)
                    .attr({
                        x: context.x(d.total),
                        y: context.y(d.key) + context.y.rangeBand() / 2,
                        dx: '0.25em',
                        dy: '0.3em'
                    })
                    .style('font-size', '80%')
                    .text(d.total);
            }
        });
    } else {
        this.current_data.forEach(d => {
            if (context.y_dom.indexOf(d.key) > -1) {
                d.values.forEach(di => {
                    context.svg
                        .append('text')
                        .classed('number-of-queries', true)
                        .attr({
                            x: context.x(di.values.x),
                            y:
                                context.y(d.key) +
                                context.y.rangeBand() *
                                    (3 - context.config.status_order.indexOf(di.key)) /
                                    4,
                            dx: '0.25em',
                            dy: '1em'
                        })
                        .style('font-size', '80%')
                        .text(di.values.x);
                });
            }
        });
    }

    //Plot data by field when viewing data by form.
    if (this.config.y.column === this.config.form_col) {
        const yLabels = this.svg
            .selectAll('.y.axis .tick')
            .style('fill', 'blue')
            .style('text-decoration', 'underline');
        yLabels.style('cursor', 'pointer').on('click', yLabel => {
            this.controls.wrap
                .selectAll('.control-group')
                .filter(d => d.label === 'Group by')
                .selectAll('option')
                .property('selected', d => d === 'Form: Field');
            this.config.y.column = 'Form: Field';
            this.config.y.label = 'Form: Field';
            this.config.marks[0].per[0] = 'Form: Field';
            this.controls.wrap
                .selectAll('.control-group')
                .filter(d => d.label === 'Form')
                .selectAll('option')
                .property('selected', d => d === yLabel);
            this.filters.filter(filter => filter.col === this.config.form_col)[0].val = yLabel;

            this.draw(this.filtered_data.filter(d => d[this.config.form_col] === yLabel));
            context.listing.wrap.selectAll('*').remove();
            context.wrap.select('listing-instruction').style('display', 'block');
            context.listing.init(context.filtered_data);
        });
    }

    //Add bar click-ability.

    const barGroups = this.svg.selectAll('.bar-group'),
        bars = this.svg.selectAll('.bar'),
        // will subtract and add to bar to offset increase in stroke-width and prevent bars
        // from overlapping as much when neighbors are both selected.
        mouseoverAttrib = {
            width: function(d) {
                return this.getBBox().width - 2.5;
            },
            x: function(d) {
                return this.getBBox().x + 2.5;
            }
        },
        mouseoverStyle = {
            'stroke-width': '5px',
            fill: 'black'
        },
        mouseoutAttrib = {
            width: function(d) {
                return this.getBBox().width + 2.5;
            },
            x: function(d) {
                return this.getBBox().x - 2.5;
            }
        },
        mouseoutStyle = {
            'stroke-width': '1px',
            fill: d => context.colorScale(d.key)
        };
    bars
        .style('cursor', 'pointer')
        .on('mouseover', function() {
            if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoverStyle);
            if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoverAttrib);
            //moveToFront causes an issue preventing onMouseout from firing in Internet Explorer so only call it in other browsers.
            if (!/trident/i.test(navigator.userAgent)) d3.select(this).moveToFront();
        })
        .on('mouseout', function() {
            if (!d3.select(this).classed('selected')) d3.select(this).style(mouseoutStyle);
            if (!d3.select(this).classed('selected')) d3.select(this).attr(mouseoutAttrib);
            bars
                .filter(function() {
                    return d3.select(this).classed('selected');
                })
                .moveToFront();
        })
        .on('click', function(d) {
            // this doesn't need a style because mouseout isn't applied when the bar is selected
            d3.select(this).classed('selected', d3.select(this).classed('selected') ? false : true);
            context.listing.wrap.selectAll('*').remove();
            // feed listing data for all selected bars
            context.listing.init(
                d3
                    .selectAll('rect.selected')
                    .data()
                    .flatMap(d => d.values.raw)
            );
            context.wrap.select('#listing-instruction').style('display', 'none'); // remove bar instructions
            // display filtered data if no bars are selected
            if (d3.selectAll('rect.selected')[0].length === 0) {
                context.listing.wrap.selectAll('*').remove();
                context.wrap.select('#listing-instruction').style('display', 'block');
                context.listing.init(context.filtered_data);
            }
        });

    legendFilter.call(this);

    //Add y-tick-label tooltips.
    if (this.config.y.column === this.config.form_col)
        this.svg
            .selectAll('.y.axis .tick')
            .filter(form => this.y_dom.indexOf(form) > -1)
            .append('title')
            .text(
                form =>
                    `Form: ${this.raw_data.filter(d => d[this.config.form_col] === form)[0][
                        this.config.formDescription_col
                    ] || form}`
            );
    if (this.config.y.column === 'Form: Field')
        this.svg
            .selectAll('.y.axis .tick')
            .style('cursor', 'help')
            .filter(field => this.y_dom.indexOf(field) > -1)
            .append('title')
            .text(field => {
                const datum = this.raw_data.filter(d => d['Form: Field'] === field)[0];
                return `Form: ${datum[this.config.formDescription_col] ||
                    datum[this.config.form_col]}\nField: ${datum[
                    this.config.fieldDescription_col
                ] || datum[this.config.field_col]}`;
            });
}
