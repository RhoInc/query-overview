export default function sortQueryRecencyOptions() {
    this.controls.filters
        .selects
        .filter(d => d.value_col === 'queryrecency')
        .selectAll('option')
        .sort((a,b) => {
            const anum = parseFloat(a);
            const bnum = parseFloat(b);
            const diff = anum - bnum;
            return diff ? diff : a < b ? -1 : a > b ? 1 : 0;
        });
}
