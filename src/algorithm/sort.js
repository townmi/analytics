/**
 * Created by townmi on 17/1/18.
 */

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

let swap = function (a, b) {
    let c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
};

/**
 * 冒泡排序(相邻两个元素比较，再看是否执行移动操作)
 * 升序(那遍历的第i个元素和子循环中元素比较，如果第i个元素比子循环中的元素大，那么立刻交换两个元素)
 */
for (let i = 0; i < arr.length; i++) {

    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
            swap(i, j);
        }
    }
}
console.log(arr);


arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

/**
 * 选择排序(选择最小或者最大的值，再和初始值执行移动操作)
 * 升序(那遍历的第i个元素和子循环中元素比较，取最小元素的索引，交换第i元素和最小元素)
 */
for (let i = 0; i < arr.length - 1; i++) {

    let tmp = null;
    let index = i;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[index]) {
            index = j;
        }
    }
    tmp = arr[index];
    arr[index] = arr[i];
    arr[i] = tmp;

}
console.log(arr);


arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

/**
 * 插入排序(从第二个元素开始遍历)
 * 升序(拿遍历索引做标记，从后向前遍历之前的所有元素，如果之前的元素都比标记的元素大，就让索引之前的元素往后移动一位，
 * 如果之前的元素比标记的元素小。那就跳出子循环，这个时候子循环跳出之前上一个索引对应的位置放入标记的元素)
 */
for (let i = 1; i < arr.length; i++) {
    let tmp = arr[i];
    let j = i - 1;
    for (; j >= 0; j--) {
        if (arr[j] > tmp) {
            arr[j + 1] = arr[j]
        } else {
            break;
        }
    }
    arr[j + 1] = tmp

}
console.log(arr);