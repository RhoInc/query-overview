export default function syncStatusGroup(controlInputs, settings) {
    const statusGroupControl = controlInputs.find(
        controlInput => controlInput.label === 'Status Group'
    );
    statusGroupControl.start = settings.color_by;
    statusGroupControl.values = settings.status_groups.map(status_group => status_group.label);
}
