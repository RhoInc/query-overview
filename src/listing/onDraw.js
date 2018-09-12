import onClick from './onDraw/onClick';

export default function onDraw() {
    onClick.call(this);

    //Move table scrollbar all the way to the left.
    this.tableContainer.scrollLeft = 9999;
    setInterval(() => (this.tableContainer.scrollLeft += 100), 25); // for whatever reason the table doesn't scroll all the way left so just give the webpage a 25 milliseconds to load and then nudge the scrollbar the rest of the way
}
