
# Query Overview Bar Charts



![alt tag](https://user-images.githubusercontent.com/31038805/34172985-d388587a-e4c1-11e7-9ca7-0b2d24de0dbc.gif)

## Overview

Query Overview is a JavaScript library built using Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)) that creates an interactive bar chart showing the distribution of queries that have been issued regarding data collected in a clinical trial.
A typical chart created with query-overview looks like the chart pictured above. 


Clicking on a bar outputs a listing of the queries themselves: 

![Listing](https://github.com/RhoInc/query-overview/wiki/img/listing.PNG)

Users can group, rearrange, and sort the bars and filter the data; the full functionality is described [here](https://github.com/RhoInc/query-overview/wiki/Technical-Documentation).
The library expects a dataset with a form, field, and status column.
Users can specify additional columns by which to group and filter the data.
Full details about chart configuration are [here](https://github.com/RhoInc/query-overview/wiki/Configuration).

## Typical Usage

Provided the input data matches the default column names the library expects, the code to initialize the chart looks like this: 

```javascript
    d3.csv('queries.csv', function(data) {
        queryOverview('body', {}).init(data);
    });
```

The chart can be configured to facilitate non-standard data formats and to alter the chart itself. Overwrite the defaults with a custom settings object like so:

```javascript
    let settings = {
        form_col: 'QDATASTR',
        formDescription_col: 'QFORM',
        field_col: 'QVARNAME',
        fieldDescription: 'QVARDESC',
        status_col: 'QSTATUS',
        groups: [
            {value_col: 'AVISIT', label: 'Visit'}],
        filters: [
            {value_col: 'QOPENBY', label: 'Query Opened by'}]
        details: [
            {value_col: 'QFORM', label: 'Form'},
            {value_col: 'QVARDESC', label: 'Field'},
            {value_col: 'QSTATUS', label: ''},
            {value_col: 'QOPENBY', label: 'MarkingGroup'},
            {value_col: 'SUBJID', label: 'Subject ID'},
            {value_col: 'AVISIT', label: 'Visit'}]
        };

    d3.csv('ADQUERY.csv', function(data) {
        queryOverview('body', settings).init(data);
    });
```

Click [here](https://rhoinc.github.io/query-overview/build/test-page/) to open an interactive example of query-overview.

## Links

- [Interactive Example](https://rhoinc.github.io/query-overview/build/test-page/)
- [Configuration](https://github.com/RhoInc/query-overview/wiki/Configuration) 
- [API](https://github.com/RhoInc/query-overview/wiki/API)
- [Technical Documentation](https://github.com/RhoInc/query-overview/wiki/Technical-Documentation) 
- [Data Guidelines](https://github.com/RhoInc/query-overview/wiki/Data-Guidelines)

