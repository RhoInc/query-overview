d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/queries.csv',
    function(d,i) {
        return d;
    },
    function(data) {
        var instance = queryOverview(
            '#container', // element
            {
            } // settings
        );
        instance.init(data);
    }
);
