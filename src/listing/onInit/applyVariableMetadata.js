export default function applyVariableMetadata() {
    const variableMetadata = [
        {
            variable: this.chart.initialSettings.site_col,
            label: 'Site',
            description: 'Site name assigned in EDC system'
        },
        {
            variable: this.chart.initialSettings.id_col,
            label: 'Participant ID',
            description: 'Subject ID assigned in EDC system'
        },
        {
            variable: this.chart.initialSettings.visit_col,
            label: 'Folder OID',
            description: 'Folder OID as assigned by DM'
        },
        {
            variable: this.chart.initialSettings.visitDescription_col,
            label: 'Folder',
            description:
                'Name of folder currently displayed in EDC system. If the folder was renamed (e.g. to append a date) this will be reflected here'
        },
        {
            variable: this.chart.initialSettings.form_col,
            label: 'Form OID',
            description: 'Form OID as assigned by DM'
        },
        {
            variable: this.chart.initialSettings.formDescription_col,
            label: 'Form',
            description:
                'Name of the form currently displayed in EDC system. If the form was renamed (e.g. to append a date) this will be reflected here'
        },
        {
            variable: this.chart.initialSettings.field_col,
            label: 'Field',
            description: 'Field name as assigned by DM'
        },
        {
            variable: this.chart.initialSettings.fieldDescription_col,
            label: 'Field Label',
            description: 'Field label as assigned by DM'
        },
        {
            variable: this.chart.initialSettings.marking_group_col,
            label: 'Marking Group',
            description: 'Group opening the query. Options include: CRA, DM, Safety, System'
        },
        {
            variable: this.chart.initialSettings.open_by_col,
            label: 'Opened by',
            description: 'Entity opening the query (System or name of individual)'
        },
        {
            variable: this.chart.initialSettings.status_col,
            label: 'Query Status',
            description:
                'Status of query in EDC system. Options include: Open, answered, closed, cancelled'
        },
        {
            variable: this.chart.initialSettings.open_date_col,
            label: 'Open Date',
            description: 'Date query was opened in the system'
        },
        {
            variable: this.chart.initialSettings.response_date_col,
            label: 'Response Date',
            description: 'Date query was responded to by the site'
        },
        {
            variable: this.chart.initialSettings.resolved_date_col,
            label: 'Resolution Date',
            description: 'Date query was closed'
        },
        {
            variable: this.chart.initialSettings.recency_col,
            label: 'Query Recency (days)',
            description:
                'Number of days between query open date and data extraction date, regardless of query status.'
        },
        {
            variable: 'queryrecency',
            label: 'Query Recency',
            description:
                'Number of days by category between query open date and data extraction date, regardless of query status. Categories include last 7, 14, and 30 days.'
        },
        {
            variable: this.chart.initialSettings.age_col,
            label: 'Query Age (days)',
            description:
                'Number of days between query open date and data extraction date, query response date, or query resolution date for open, answered, and closed/cancelled queries, respectively.'
        },
        {
            variable: 'queryage',
            label: 'Query Age',
            description:
                'Number of days by category between query open date and data extraction date, query response date, or query resolution date for open, answered, and closed/cancelled queries, respectively.'
        },
        {
            variable: this.chart.initialSettings.query_col,
            label: 'Query',
            description: 'Text of query'
        },
        {
            variable: this.chart.initialSettings.query_response_col,
            label: 'Query Response',
            description: 'Site response to the query'
        }
    ];

    this.config.descriptions = [];
    this.config.cols.forEach((col, i) => {
        const md = variableMetadata.find(variableMetadatum => variableMetadatum.variable === col);
        this.config.headers[i] = md ? md.label : col;
        this.config.descriptions.push(md ? md.description : col);
    });
}
