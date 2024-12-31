let d1Numbers;
let d2Numbers;

d1Numbers = prompt("Nhập dãy số d1: ");
d2Numbers = prompt("Nhập dãy số d2: ");

function parseIntArr(arr = []) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }

    return arr;
}

let d1 = parseIntArr(d1Numbers.split(","));
let d2 = parseIntArr(d2Numbers.split(","));

console.log("Dãy số d1:", d1);
console.log("Dãy số d2:", d2);

function checkForNumbersExistedInTwoArrs(arr1 = [], arr2 = []) {
    let results = [];

    for (let n of arr1) {
        if (arr2.includes(n)) {
            results.push(n);
        }
    }

    return results;
}

console.log("Các số trong dãy số d1 trùng với dãy số d2:", checkForNumbersExistedInTwoArrs(d1, d2));

function sumArr(arr = []) {
    let sum = 0;

    for (let n of arr) {
        sum += n;
    }

    return sum;
}

let d1Sum = sumArr(d1);
console.log("Tổng của dãy d1:", d1Sum);