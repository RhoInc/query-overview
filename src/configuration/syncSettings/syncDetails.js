export default function syncDetails(settings) {
    settings.details = arrayOfVariablesCheck([], settings.details);
    if (settings.details.length === 0)
        delete settings.details;
}
