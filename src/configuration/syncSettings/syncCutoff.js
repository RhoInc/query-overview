export default function syncCutoff(settings) {
    if (!(+settings.cutoff > 0 || settings.cutoff === 'All')) settings.cutoff = 10;
}
