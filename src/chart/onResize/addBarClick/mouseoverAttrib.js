export default function mouseoverAttrib(bar, selected) {
    if (!selected)
        bar.attr({
            width: function(d) {
                return this.getBBox().width - 2.5;
            },
            x: function(d) {
                return this.getBBox().x + 2.5;
            }
        });
}
