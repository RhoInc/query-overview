export default function moveScrollBarLeft() {
    this.tableContainer.scrollLeft = 9999;
    const scrollATadMore = setInterval(() => (this.tableContainer.scrollLeft += 100), 10); // for whatever reason the table doesn't scroll all the way left so just give the webpage a 25 milliseconds to load and then nudge the scrollbar the rest of the way
    setTimeout(() => clearInterval(scrollATadMore), 10);
}
