The most straightforward way to customize query-overview is by using a configuration object whose properties describe the behavior and appearance of the chart. Since query-overview is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to query-overview to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each query-overview setting as of version 2.0.0.

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

**default:** `"null"`



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

coloring variable name of query categorization: query age, query status, or any custom categorization; note that _queryage_ is derived by the renderer

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

query age variable measured in days between query open date and data snapshot date, query response date, or query resolution date for open, answered, and resolved queries, respectively

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



## settings.recency_category_col
`string`

query recency category variable name; overrides `recency_col`

**default:** `"open_time"`



## settings.recency_col
`string`

query recency variable measured in days between query open date and data snapshot date, regardless of query status

**default:** `"odays"`



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

an array of variables by which to count queries; each value of the variable is plotted on the y-axis

**default:** none

### settings.groups[].value_col
`string`

group-by variable name

**default:** none

### settings.groups[].label
`string`

group-by variable label

**default:** none



## settings.status_groups
`array`

an array of variables with which to stratify each group-by value, each value of which plots as a component of a stacked bar when Bar Arrangement is set to _Stacked_ or as individual bars when Bar Arrangement is set to _grouped_

**default:** none

### settings.status_groups[].value_col
`string`

Stratification variable name

**default:** none

### settings.status_groups[].label
`string`

Stratification variable label

**default:** none

### settings.status_groups[].order
`array`

Stratification variable order

**default:** none

### settings.status_groups[].colors
`array`

Stratification variable colors

**default:** none



## settings.filters
`array`

an array of variables with which to filter the data

**default:** none

### settings.filters[].value_col
`string`

filter variable name

**default:** none

### settings.filters[].label
`string`

filter variable label

**default:** none



## settings.dropdown_size
`number`

controls the maximum number of options that appear in the multi-select dropdowns before a scrollbar appears

**default:** `6`



## settings.details
`array`

an array of variables which will print in the listing; if unspecified all variables in data will appear in listing

**default:** none

### settings.details[].value_col
`string`

detail listing variable name

**default:** none

### settings.details[].label
`string`

detail listing column header

**default:** none



## settings.bar_arrangement
`string`

controls arrangement of bars, either stacked or grouped side-by-side

**default:** `"stacked"`



## settings.cutoff
`number`

a value that limits the number of groups displayed on the y-axis

**default:** `All`



## settings.alphabetize
`boolean`

sort groups on the y-axis alphanumerically; by default groups are sorted by descending frequency

**default:** `true`



## settings.truncate_listing_cells
`boolean`

optionally truncate cell text past a certain number of characters

**default:** `true`



## settings.truncation_cutoff
`number`

cell text past this cutoff will be truncated and the full text will be captured in a tooltip

**default:** `100`

# Webcharts settings
The objects below contain Webcharts settings for each display as of version 2.0.0 of the Query Overview.

## Chart
```
{
    "x": {
        "label": "# of Queries",
        "column": null,
        "behavior": "flex"
    },
    "y": {
        "type": "ordinal",
        "column": null,
        "label": "Form",
        "sort": null
    },
    "marks": [
        {
            "type": "bar",
            "per": [
                null
            ],
            "split": null,
            "arrange": null,
            "summarizeX": "count",
            "tooltip": null
        }
    ],
    "color_by": null,
    "color_dom": null,
    "legend": {
        "location": "top",
        "label": null,
        "order": null
    },
    "margin": {
        "right": "50"
    },
    "range_band": 25
}
```

## Listing
```
{
    "nRowsPerPage": 25,
    "exportable": true
}
```