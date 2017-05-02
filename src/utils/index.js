/**
 * Given some array:
 *    [
 *      {brand: 'Nike', name: 'AirMax'},
 *      {brand: 'Nike', name: 'Cortez'},
 *      {brand: 'Adidas', name: 'Ultra Boost'}
 *    ]
 *
 * This function will return a new array that groups by a specific
 * key and returns a count for each key:
 *
 *    [
 *      {brand: 'Nike', count: 2},
 *      {brand: 'Adidas', count: 1}
 *    ]
 * @param arr An array of objects
 * @param key A string of the object property
 */
export function countByKey(arr, key) {
    let newArray = [];
    arr.forEach(function (item) {
        const value = item[key];
        const foundItem = newArray.find(function (existingItem) {
            return existingItem[key] === value;
        });
        if (foundItem) {
            foundItem.count++;
        } else {
            let newItem = {count: 1};
            newItem[key] = value;
            newArray.push(newItem)
        }
    });
    return newArray;
}