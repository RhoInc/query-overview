// from http://2ality.com/2017/04/flatmap.html

export default function flatMap(arr, mapFunc) {
    const result = [];
    for (const [index, elem] of arr.entries()) {
        const x = mapFunc(elem, index, arr);
        if (Array.isArray(x)) {
            result.push(...x);
        } else {
            result.push(x);
        }
    }
    return result;
}
