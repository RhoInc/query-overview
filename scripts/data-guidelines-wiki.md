The Query Overview accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The renderer visualizes clinical query data with **one row per query** plus the required variables specified below.

## Data structure
one record per query

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|`form_col`|_formoid_|**character**|form variable name|**Yes**|
|`formDescription_col`|_ecrfpagename_|**character**|form description variable name|**Yes**|
|`field_col`|_fieldname_|**character**|field variable name|**Yes**|
|`fieldDescription_col`||**character**|field description variable name||
|`site_col`|_sitename_|**character**|site variable name|**Yes**|
|`marking_group_col`|_markinggroup_|**character**|query origin variable name|**Yes**|
|`visit_col`|_folderoid_|**character**|visit/folder variable name|**Yes**|
|`age_col`|_qdays_|**numeric**|query age variable measured in days between query open date and data snapshot date, query response date, or query resolution date for open, answered, and resolved queries, respectively|**Yes**|
|`status_col`|_querystatus_|**character**|query status variable name|**Yes**|
|`recency_category_col`|_open_time_|**character**|query recency category variable name; overrides `recency_col`||
|`recency_col`|_odays_|**numeric**|query recency variable measured in days between query open date and data snapshot date, regardless of query status||
|`groups[]`||**either**|an array of variables by which to count queries; each value of the variable is plotted on the y-axis||
|`status_groups[]`||**either**|an array of variables with which to stratify each group-by value, each value of which plots as a component of a stacked bar when Bar Arrangement is set to _Stacked_ or as individual bars when Bar Arrangement is set to _grouped_||
|`filters[]`||**either**|an array of variables with which to filter the data||
|`details[]`||**either**|an array of variables which will print in the listing; if unspecified all variables in data will appear in listing||