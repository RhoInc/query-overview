import { select } from 'd3';

export default function onDestroy() {
    //Destroy listing.
    this.listing.destroy();

    //Remove stylesheet.
    this.style.remove();

    //Clear container, removing one child node at a time.
    const node = select(this.element).node();
    while (node.firstChild) node.removeChild(node.firstChild);
}
