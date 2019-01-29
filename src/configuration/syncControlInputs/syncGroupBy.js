export default function syncGroupBy(controlInputs, settings) {
    const groupByControl = controlInputs.find(controlInput => controlInput.label === 'Group by');
    groupByControl.values = settings.groups.map(group => group.label);
}
