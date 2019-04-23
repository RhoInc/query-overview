export default function mouseoverAttrib(bar, selected) {
    if (!selected) {
        let BBox = bar.node().getBBox();
        BBox = {
            height: BBox.height,
            width: BBox.width,
            x: BBox.x,
            y: BBox.y
        };
        const offset = BBox.width > 2.5 ? 2.5 : BBox.width / 2; // for bars 2.5px wide or narrower
        bar.attr({
            width: function(d) {
                d.BBox = BBox;
                d.BBox.width = BBox.width - offset;
                d.offset = offset;
                return d.BBox.width;
            },
            x: function(d) {
                d.BBox.x = BBox.x + offset;
                return d.BBox.x;
            }
        });
    }
}
