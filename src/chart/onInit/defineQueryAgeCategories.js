export default function defineQueryAgeCategories() {
    const queryAgeCategoryInput = this.controls.config.inputs.find(
        input => input.value_col === this.config.age_category_col
    );
    const queryAgeCategoryGroup = this.config.status_groups.find(
        age_category_group => age_category_group.value_col === this.config.age_category_col
    );
    const queryStatusOrder = this.config.status_groups.find(
        status_group => status_group.value_col === this.config.status_col
    ).order;
    const queryAgeCategoryOrder = Array.isArray(queryAgeCategoryGroup.order)
        ? queryAgeCategoryGroup.order.concat(
              d3
                  .set(this.raw_data.map(d => d[this.config.age_category_col]))
                  .values()
                  .filter(value => queryAgeCategoryGroup.order.indexOf(value) < 0)
                  .sort()
          )
        : d3
              .set(this.raw_data.map(d => d[this.config.age_category_col]))
              .values()
              .sort((a, b) => {
                  const aIndex = queryStatusOrder.indexOf(a);
                  const bIndex = queryStatusOrder.indexOf(b);
                  const diff = aIndex - bIndex;

                  return diff ? diff : a < b ? -1 : 1;
              });
    queryAgeCategoryInput.order = queryAgeCategoryOrder;
    queryAgeCategoryGroup.order = queryAgeCategoryOrder;
}
