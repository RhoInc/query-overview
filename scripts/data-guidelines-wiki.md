The Query Overview accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The renderer visualizes clinical query data with **one row per query** plus the required variables specified below.

## Data structure
one record per query

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**form_col**|formoid|string|form variable name|**Y**|
|**formDescription_col**|ecrfpagename|string|form description variable name|**Y**|
|**field_col**|fieldname|string|field variable name|**Y**|
|**fieldDescription_col**|fieldname|string|field description variable name||
|**site_col**|sitename|string|site variable name|**Y**|
|**marking_group_col**|markinggroup|string|query origin variable name|**Y**|
|**visit_col**|folderoid|string|visit/folder variable name|**Y**|
|**color_by_col**|queryage|string|coloring variable name of query categorization: query age, query status, or any custom categorication|**Y**|
|**age_col**|qdays|string|query age variable measured in days between query open date and data snapshot date, query response date, or query resolution date for open, answered, and resolved queries, respectively|**Y**|
|**status_col**|querystatus|string|query status variable name|**Y**|
|**recency_category_col**|open_time|string|query recency category variable name; overrides `recency_col`||
|**recency_col**|odays|string|query recency variable measured in days between query open date and data snapshot date, regardless of query status||
|**groups[]**|_user-defined_|array|an array of variables by which to count queries; each value of the variable is plotted on the y-axis||
|**status_groups[]**|_user-defined_|array|an array of variables with which to stratify each group-by value, each value of which plots as a component of a stacked bar when Bar Arrangement is set to _Stacked_ or as individual bars when Bar Arrangement is set to _grouped_||
|**filters[]**|_user-defined_|array|an array of variables with which to filter the data||
|**details[]**|_user-defined_|array|an array of variables which will print in the listing; if unspecified all variables in data will appear in listing||