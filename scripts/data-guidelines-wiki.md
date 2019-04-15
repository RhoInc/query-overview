The Query Overview accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The renderer visualizes clinical query data with **one row per query** plus the required variables specified below.

## Data structure
one record per query

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|`site_col`|_sitename_|**character**|site variable name|**Yes**|
|`id_col`|_subjectnameoridentifier_|**character**|participant ID variable name||
|`visit_col`|_folderoid_|**character**|visit/folder variable name|**Yes**|
|`visitDescription_col`|_folderinstancename_|**character**|visit/folder description variable name||
|`form_col`|_formoid_|**character**|form variable name|**Yes**|
|`formDescription_col`|_ecrfpagename_|**character**|form description variable name||
|`field_col`|_fieldname_|**character**|field variable name|**Yes**|
|`fieldDescription_col`|_fieldlabel_|**character**|field description variable name||
|`marking_group_col`|_markinggroup_|**character**|query origin variable name|**Yes**|
|`open_by_col`|_queryopenby_|**character**|entity opening query variable name||
|`query_col`|_querytext_|**character**|query text variable name||
|`query_response_col`|_queryresponsetext_|**character**|query response text variable name||
|`status_col`|_querystatus_|**character**|query status variable name|**Yes**|
|`open_date_col`|_queryopendate_|**character**|query open date variable name||
|`response_date_col`|_queryresponsedate_|**character**|query response date variable name||
|`resolved_date_col`|_queryresolveddate_|**character**|query resolution date variable name||
|`recency_col`|_odays_|**numeric**|query recency variable measured in days between query open date and data snapshot date, regardless of query status||
|`recency_category_col`|_open_time_|**character**|query recency category variable name; overrides `recency_col`||
|`age_col`|_qdays_|**numeric**|query age variable measured in days between query open date and data snapshot date, query response date, or query resolution date for open, answered, and resolved queries, respectively|**Yes**|
|`groups[]`||**either**|an array of variables by which to count queries; each value of the variable is plotted on the y-axis||
|`status_groups[]`||**either**|an array of variables with which to stratify each group-by value, each value of which plots as a component of a stacked bar when Bar Arrangement is set to _Stacked_ or as individual bars when Bar Arrangement is set to _grouped_||
|`filters[]`||**either**|an array of variables with which to filter the data||
|`details[]`||**either**|an array of variables which will print in the listing; if unspecified all variables in data will appear in listing||