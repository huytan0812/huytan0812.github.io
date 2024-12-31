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

for (let number of d2) {
    if (number % d1Sum == 0) {
        console.log(`Số ${number} từ mảng d2 chia hết cho tổng của d1 ${d1Sum}`);
    }
}

function dividedBy2(arr = []) {
    let results = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 0) {
            results.push(arr[i]);
        }
    }

    return results;
}

let dividedBy2_d1= dividedBy2(d1);
let dividedBy2_d2= dividedBy2(d2);

console.log("Dãy số chia hết cho 2 của mảng d1:", dividedBy2_d1);
console.log("Dãy số chia hết cho 2 của mảng d2:", dividedBy2_d2);