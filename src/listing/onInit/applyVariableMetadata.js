export default function applyVariableMetadata() {
    const variableMetadata = [
        {
            variable: this.initialSettings.site_col,
            label: 'Site',
            description: 'Site name assigned in EDC system',
        },
        {
            variable: this.initialSettings.id_col,
            label: 'Participant ID',
            description: 'Subject ID assigned in EDC system',
        },
        {
            variable: this.initialSettings.visit_col,
            label: 'Folder OID',
            description: 'Folder OID as assigned by DM',
        },
        {
            variable: this.initialSettings.visitDescription_col,
            label: 'Folder',
            description: 'Name of folder currently displayed in EDC system. If the folder was renamed (e.g. to append a date) this will be reflected here',
        },
        {
            variable: this.initialSettings.form_col,
            label: 'Form OID',
            description: 'Form OID as assigned by DM',
        },
        {
            variable: this.initialSettings.formDescription_col,
            label: 'Form',
            description: 'Name of the form currently displayed in EDC system. If the form was renamed (e.g. to append a date) this will be reflected here',
        },
        {
            variable: this.initialSettings.field_col,
            label: 'Field',
            description: 'Field name as assigned by DM',
        },
        {
            variable: this.initialSettings.fieldDescription_col,
            label: 'Field Label',
            description: 'Field label as assigned by DM',
        },
        {
            variable: this.initialSettings.marking_group_col,
            label: 'Marking Group',
            description: 'Group opening the query. Options include: CRA, DM, Safety, System',
        },
        {
            variable: this.initialSettings.open_by_col,
            label: 'Opened by',
            description: 'Entity opening the query (System or name of individual)',
        },
        {
            variable: this.initialSettings.status_col,
            label: 'Query Status',
            description: 'Status of query in EDC system. Options include: Open, answered, closed, cancelled',
        },
        {
            variable: this.initialSettings.open_date_col,
            label: 'Open Date',
            description: 'Date query was opened in the system',
        },
        {
            variable: this.initialSettings.response_date_col,
            label: 'Response Date',
            description: 'Date query was responded to by the site',
        },
        {
            variable: this.initialSettings.resolved_date_col,
            label: 'Resolution Date',
            description: 'Date query was closed',
        },
        {
            variable: this.initialSettings.recency_category_col,
            label: 'Query Recency',
            description: 'Number of days from when the query was opened to the data extraction date. This is populated for all queries (e.g. open and closed). Options include: Last 7, 14, and 30 days)',
        },
        {
            variable: this.initialSettings.age_col,
            label: 'Query Age',
            description: 'Number of days the query has been/was open. Number of days from date opened to answered or for queries open the number of days from date opened to data extraction date',
        },
        {
            variable: this.initialSettings.query_col,
            label: 'Text',
            description: 'Text of query',
        },
        {
            variable: this.initialSettings.query_response_col,
            label: 'Response',
            description: 'Site response to the query',
        },
    ];

    this.config.descriptions = [];
    this.config.cols.forEach((col,i) => {
        const md = variableMetadata
            .find(variableMetadatum => variableMetadatum.variable === col);
        this.config.headers[i] = md ? md.label : col;
        this.config.descriptions.push(md ? md.description : col);
    });
    console.log(this.config.descriptions);
}
