# Query Overview
![alt tag](https://user-images.githubusercontent.com/31038805/34172985-d388587a-e4c1-11e7-9ca7-0b2d24de0dbc.gif)

## Overview
Query Overview is a JavaScript library built using Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)) that creates an interactive bar chart showing the distribution of queries that have been issued regarding data collected in a clinical trial.
A typical chart created with query-overview looks like the chart pictured above. 

Clicking on a bar outputs a listing of the queries themselves: 

![Listing](https://github.com/RhoInc/query-overview/wiki/img/listing.PNG)

Users can group, rearrange, and sort the bars and filter the data; the full functionality is described [here](https://github.com/RhoInc/query-overview/wiki/Technical-Documentation).
The library expects a dataset with site, visit, form, field, query status, and query age columns.
The full data specification is tabulated [here](https://github.com/RhoInc/query-overview/wiki/Data-Guidelines);
Users can specify additional columns by which to group and filter the data.
Full details about chart configuration are [here](https://github.com/RhoInc/query-overview/wiki/Configuration).

## Typical Usage
Provided the input data matches the default column names the library expects, the code to initialize the chart looks like this: 

```javascript
    const element = 'body';
    const settings = {};
    d3.csv(
        'queries.csv',
        function(data) {
            queryOverview(element, settings).init(data);
        }
    );
```

The chart can be configured to facilitate non-standard data formats and to alter the chart itself. Overwrite the defaults with a custom settings object like so:

```javascript
    const element = 'body';
    const settings = {
        site_col: 'SITEID',
        id_col: 'USUBJID',
        visit_col: 'AVISIT',
        form_col: 'FORM',
        field_col: 'FIELD',
        marking_group_col: 'MARKGRP',
        status_col: 'STATUS',
        age_col: 'ADURN',
        age_cutoffs: [
            7,
            14,
            21,
            28
        ],
    };

    d3.csv(
        'ADQUERY.csv',
        function(data) {
            queryOverview(element, settings).init(data);
        }
    );
```

Click [here](https://rhoinc.github.io/query-overview/test-page/) to open an interactive example of query-overview.

## Links
- [Interactive Example](https://rhoinc.github.io/query-overview/test-page/)
- [Wiki](https://github.com/RhoInc/query-overview/wiki)
- [API](https://github.com/RhoInc/query-overview/wiki/API)
- [Configuration](https://github.com/RhoInc/query-overview/wiki/Configuration) 
- [Data Guidelines](https://github.com/RhoInc/query-overview/wiki/Data-Guidelines)
- [Technical Documentation](https://github.com/RhoInc/query-overview/wiki/Technical-Documentation) 
