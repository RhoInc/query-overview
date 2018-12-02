export default function syncStatusGroups(settings) {
    //age ranges
    settings.ageRanges = settings.age_cutoffs.map(
        (d, i) => (i > 0 ? [settings.age_cutoffs[i - 1], d] : [0, d])
    );
    settings.ageRanges.push([settings.age_cutoffs[settings.age_cutoffs.length - 1], null]);

    //age range categories
    settings.ageRangeCategories = settings.age_cutoffs.every(age_range => age_range % 7 === 0)
        ? settings.ageRanges.map(
              (ageRange, i) =>
                  i < settings.ageRanges.length - 1
                      ? `${ageRange.map(days => days / 7).join('-')} weeks`
                      : `>${ageRange[0] / 7} weeks`
          )
        : settings.ageRanges.map(
              (ageRange, i) =>
                  i < settings.ageRanges.length - 1
                      ? `${ageRange.join('-')} days`
                      : `>${ageRange[0]} days`
          );

    //age range colors
    let ageRangeColors = settings.age_range_colors.slice(
        settings.age_range_colors.length - settings.ageRanges.length
    );
    settings.status_order.forEach((status, i) => {
        if (settings.age_statuses.indexOf(status) < 0)
            ageRangeColors.push(settings.status_colors[i]);
    });

    //reconcile settings.status_order with settings.status_colors to ensure equal length
    if (settings.status_order.length !== settings.status_colors.length) {
        console.warn('The number of query statuses does not match the number of query colors:');
        console.log(settings.status_order);
        console.log(settings.status_colors);
    }

    //default status groups
    const defaultStatusGroups = [
        {
            value_col: 'queryage', // derived in ../chart/onInit/defineNewVariables
            label: 'Query Age',
            order: settings.ageRangeCategories.concat(
                settings.status_order.filter(status => settings.age_statuses.indexOf(status) < 0)
            ),
            colors: ageRangeColors
        },
        {
            value_col: settings.status_col,
            label: 'Query Status',
            order: settings.status_order,
            colors: settings.status_colors
        }
    ];

    //add custom status groups
    settings.status_groups = settings.arrayOfVariablesCheck(
        defaultStatusGroups,
        settings.status_groups
    );
    console.log(settings.color_by_col);
    settings.status_group = settings.status_groups.find(status_group => status_group.value_col === settings.color_by_col);
}
