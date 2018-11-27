export default function mouseoutAttrib(element) {
    const selection = d3.select(element);
    selection.attr({
        width: function(d) {
            return this.getBBox().width + 2.5;
        },
        x: function(d) {
            return this.getBBox().x - 2.5;
        }
    });
}