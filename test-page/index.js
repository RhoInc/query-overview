d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/queries.csv',
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
        };
        var instance = queryOverview(
            '#container',
            settings
        );
        instance.init(data);
    }
);
