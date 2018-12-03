The most straightforward way to customize query-overview is by using a configuration object whose properties describe the behavior and appearance of the chart. Since query-overview is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to query-overview to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each query-overview setting as of version 1.2.3.

## settings.form_col
`string`

form variable name

**default:** `"formoid"`



## settings.formDescription_col
`string`

form description variable name

**default:** `"ecrfpagename"`



## settings.field_col
`string`

field variable name

**default:** `"fieldname"`



## settings.fieldDescription_col
`string`

field description variable name

**default:** `"fieldname"`



## settings.site_col
`string`

site variable name

**default:** `"sitename"`



## settings.marking_group_col
`string`

query origin variable name

**default:** `"markinggroup"`



## settings.visit_col
`string`

visit/folder variable name

**default:** `"folderoid"`



## settings.color_by_col
`string`

coloring variable name of query categorization: query age, query status, or any custom categorication

**default:** `"queryage"`



## settings.age_statuses
`array`

an array of query statuses for which query age will be derived

**default:** 
```
[
  "Open"
]
```



## settings.age_col
`string`

query age variable measured in days between query open date and data snapshot date

**default:** `"qdays"`



## settings.age_cutoffs
`array`

an array of query age cutoffs for which query age range will be derived

**default:** 
```
[
  14,
  28,
  56,
  112
]
```



## settings.age_range_colors
`array`

an array of colors with which to color query age range categories; only as many colors as there are query age range categories will be used, from darkest to lightest

**default:** 
```
[
  "#ffffcc",
  "#ffeda0",
  "#fed976",
  "#feb24c",
  "#fd8d3c",
  "#fc4e2a",
  "#e31a1c",
  "#bd0026",
  "#800026"
]
```



## settings.status_col
`string`

query status variable name

**default:** `"querystatus"`



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
  "#fd8d3c",
  "#4daf4a",
  "#377eb8",
  "#999999"
]
```



## settings.recency_col
`string`

query recency variable measured in days between query open date and data snapshot date

**default:** `"qdays"`



## settings.recency_cutoffs
`array`

an array of query recency cutoffs for which query recency range will be derived

**default:** 
```
[
  7,
  14,
  30
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



## settings.dropdown_size
`number`

controls the maximum number of options that appear in the multi-select dropdowns before a scrollbar appears

**default:** `6`



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



## settings.bar_arrangement
`string`

controls arrangement of bars, either stacked or grouped side-by-side

**default:** `"stacked"`



## settings.cutoff
`number`

a value that limits the number of groups displayed on the y-axis

**default:** `All`



## settings.range_band
`number`

controls the height of each value on the y-axis

**default:** `25`



## settings.alphabetize
`boolean`

sort groups on the y-axis alphanumerically; by default groups are sorted by descending frequency

**default:** `true`



## settings.nRowsPerPage
`number`

the number of rows displayed per page.

**default:** `10`



## settings.exportable
`boolean`

allow the export of data to .csv via a button beneath the detail listing

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 1.2.3.

```
{    x: {        label: '# of Queries',        column: null,        behavior: 'flex'    },    y: {        type: 'ordinal',        column: null, // set in syncSettings()        label: 'Form',        sort: null, // set in syncSettings()        range_band: null // set in syncSettings()    },    marks: [        {            type: 'bar',            per: [null], // set in syncSettings()            split: null, // set in syncSettings()            arrange: null, // set in syncSettings()            summarizeX: 'count',            tooltip: null // set in syncSettings()        }    ],    color_by: null, // set in syncSettings()    color_dom: null, // set in syncSettings()    legend: {        location: 'top',        label: null, // set in syncSettings()        order: null // set in syncSettings()    },    margin: {        right: '50' // room for count annotation    }};}
```