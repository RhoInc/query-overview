d3.csv(
    //'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/queries/queries.csv',
    '../../viz-library/data/dataCleaning/queries/queries.csv',
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {
            recency_category_col: null,
            //recency_col: null,
        };
        var instance = queryOverview(
            '#container',
            settings
        );
        instance.init(data);
    }
);
