The most straightforward way to customize query-overview is by using a configuration object whose properties describe the behavior and appearance of the chart. Since query-overview is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to query-overview to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each query-overview setting as of version 1.2.0.

## settings.form_col
`string`

form variable name

**default:** `"Datastr"`



## settings.formDescription_col
`string`

form description variable name

**default:** `"Form"`



## settings.field_col
`string`

field variable name

**default:** `"Field Name"`



## settings.fieldDescription_col
`string`

field description variable name

**default:** `"Field"`



## settings.marking_group_col
`string`

query origin variable name

**default:** `"Query Open By: Marking Group"`



## settings.status_col
`string`

query status variable name

**default:** `"Query Status"`



## settings.status_order
`array`

an array of query statuses that dictates how they are ordered in the legend and chart

**default:** 
```
[
  "Open",
  "Answered",
  "Closed",
  "Cancelled"
]
```



## settings.status_colors
`array`

an array of colors that determines the colors for query statuses

**default:** 
```
[
  "#fb9a99",
  "#fdbf6f",
  "#1f78b4",
  "gray"
]
```



## settings.aging_col
`string`

query age variable name

**default:** `"Query Age Category"`



## settings.aging_order
`array`

an array of query age categories that dictates how they are ordered in the legend and chart

**default:** none



## settings.aging_colors
`array`

an array of colors that determines the colors for query age categories

**default:** 
```
[
  "#fcae91",
  "#fb6a4a",
  "#de2d26",
  "#a50f15"
]
```



## settings.groups
`array`

an array of group-by variables by which to group queries on the y-axis

**default:** none

### settings.groups[].value_col
`string`

Group-by Variable

**default:** none

### settings.groups[].label
`string`

Group-by Label

**default:** none



## settings.status_groups
`array`

an array of Stratification variables by which to stratify the stacked bars

**default:** none

### settings.status_groups[].value_col
`string`

Stratification Variable

**default:** none

### settings.status_groups[].label
`string`

Stratification Label

**default:** none

### settings.status_groups[].order
`array`

Stratification Order

**default:** none

### settings.status_groups[].colors
`array`

Stratification Colors

**default:** none



## settings.site_col
`string`

site variable name

**default:** `"Site Name"`



## settings.filters
`array`

an array of filter variables with which to filter the data

**default:** none

### settings.filters[].value_col
`string`

Filter Variable

**default:** none

### settings.filters[].label
`string`

Filter Label

**default:** none



## settings.details
`array`

an array of detail variables which will print in the detail listing

**default:** none

### settings.details[].value_col
`string`

Detail Listing Variable

**default:** none

### settings.details[].label
`string`

Detail Listing Column Header

**default:** none



## settings.dropdown_size
`number`

controls the maximum number of options that appear in the multi-select dropdowns before a scrollbar appears

**default:** `6`



## settings.cutoff
`number`

a value that limits the number of groups displayed on the y-axis

**default:** `10`



## settings.alphabetize
`boolean`

sort groups on the y-axis alphanumerically; by default groups are sorted by descending frequency

**default:** `false`



## settings.exportable
`boolean`

allow the export of data to .csv via a button beneath the detail listing

**default:** `true`



## settings.nRowsPerPage
`number`

the number of rows displayed per page.

**default:** `10`

# Webcharts settings
The object below contains each Webcharts setting as of version 1.2.0.

```
{    x: {        label: '# of Queries',        behavior: 'flex'    },    y: {        type: 'ordinal',        column: null, // set in syncSettings()        label: 'Form',        sort: 'total-descending'    },    marks: [        {            type: 'bar',            per: [null], // set in syncSettings()            split: null, // set in syncSettings()            arrange: 'stacked',            summarizeX: 'count',            tooltip: null // set in syncSettings()        }    ],    color_by: null, // set in syncSettings()    color_dom: null, // set in syncSettings()    legend: {        location: 'top',        //  label: 'Query Status',        label: null,        order: null // set in syncSettings()    },    range_band: 15,    margin: { right: '50' } // room for count annotation};}
```