d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/queries.csv',
    //'../../data-library/data/clinical-trials/data-cleaning/queries.csv', // load local data file for better performance
    function(d) {
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
