// from https://gist.github.com/samgiles/762ee337dff48623e729

export default (Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
});
