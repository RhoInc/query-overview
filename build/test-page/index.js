//Load local build if in local environment.
if (window.origin !== 'https://rhoinc.github.io') {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../queryOverview.js';
    head.appendChild(script);
}

d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/queries/queries.csv',
    function(d) {
        delete d.open_time;
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {};
        var instance = queryOverview(
            '#container',
            settings
        );
        instance.init(data);
    }
);
