export default function mouseoutAttrib(bar, selected, clear = false) {
    if (!(selected || clear) || (selected && clear))
        bar.attr({
            width: function(d) {
                return this.getBBox().width + 2.5;
            },
            x: function(d) {
                return this.getBBox().x - 2.5;
            }
        });
}
