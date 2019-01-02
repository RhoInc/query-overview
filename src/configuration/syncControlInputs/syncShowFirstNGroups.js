export default function syncShowFirstNGroups(controlInputs, settings) {
    const nGroupsControl = controlInputs.find(
        controlInput => controlInput.label === 'Show First N Groups'
    );
    if (nGroupsControl.values.indexOf(settings.cutoff.toString()) === -1) {
        settings.cutoff = settings.cutoff.toString();
        nGroupsControl.values.push(settings.cutoff.toString());
        nGroupsControl.values.sort((a, b) => (a === 'All' ? 1 : b === 'All' ? -1 : +a - +b));
    } else settings.cutoff = settings.cutoff.toString() || nGroupsControl.values[0];
}
