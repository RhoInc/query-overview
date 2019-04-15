export default function mouseoutAttrib(bar, selected, clear = false) {
    if (!(selected || clear) || (selected && clear)) {
        bar.attr({
            width: function(d) {
                d.BBox.width = d.BBox.width + d.offset;
                return d.BBox.width;
            },
            x: function(d) {
                d.BBox.x = d.BBox.x - d.offset;
                return d.BBox.x;
            }
        });
    }
}
