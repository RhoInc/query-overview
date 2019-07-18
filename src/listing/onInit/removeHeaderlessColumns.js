export default function removeHeaderlessColumns() {
    var col_index = this.config.headers.indexOf('');

    if (col_index !== -1) {
        console.warn('Column(s) without headers were detected and removed from listing. ');

        // delete data for headerless column
        this.data.raw.forEach(d => delete d['']);

        // remove headerless column placeholder from config too ... LEAVE NO TRACE
        this.config.headers.splice(col_index, 1);
        this.config.cols.splice(col_index, 1);
    }
}
