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
export function countByKey (arr, key) {
    var newarr = [];
    var count = 0;
    ;
    for (var i = 0; i < arr.length; i++) {

        // if (arr[i].brand == key) {
        {
            count ++;
            newarr.push([arr[i].brand,count])
        };



        // }
    }
    console.log("new.array",newarr);
    return newarr;



}
