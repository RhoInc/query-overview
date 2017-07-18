export default function onDataTransform() {
    var chart = this;

    //Attach current filtered data to download link.
    if (this.config.exportData) {
        var CSVarray = [];

        this.filtered_data.forEach(function(d, i) {
            //add headers to CSV array
            if (i === 0) {
                var headers = Object.keys(d)
                    .filter(function(header) {
                        return header !== 'Form: Field';
                    })
                    .map(function(key) {
                        return '"' + key.replace(/"/g, '""') + '"';
                    });
                CSVarray.push(headers);
            }

            //add rows to CSV array
            var row = Object.keys(d)
                .filter(function(key) {
                    return key !== 'Form: Field';
                })
                .map(function(key) {
                    if (typeof d[key] === 'string') d[key] = d[key].replace(/"/g, '""');

                    return '"' + d[key] + '"';
                });

            CSVarray.push(row);
        });

        //transform CSV array into CSV string
        var CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' }),
            fileName = 'queries.csv',
            link = chart.controls.wrap.select('#downloadCSV');

        if (navigator.msSaveBlob) {
            // IE 10+
            link.style({
                cursor: 'pointer',
                'text-decoration': 'underline',
                color: 'blue'
            });
            link.on('click', function() {
                navigator.msSaveBlob(CSV, fileName);
            });
        } else {
            // Browsers that support HTML5 download attribute
            if (link.node().download !== undefined) {
                // feature detection
                var url = URL.createObjectURL(CSV);
                link.node().setAttribute('href', url);
                link.node().setAttribute('download', fileName);
            }
        }
    }
}
