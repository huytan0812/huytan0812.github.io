let numbersString = prompt("Nhập dãy số: ");
let n = parseInt(prompt("Nhập n: "));

let numbers = numbersString.split(",");

function square(arr = []) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.pow(parseInt(arr[i]), 2);
    }
    return arr;
}

numbers = square(numbers);

console.log("Dãy số sau khi bình phương: ", numbers);

function numbersGreaterThanN(arr = [], n = 0) {
    let results = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= n) {
            results.push(arr[i]);
        }
    }

    return results;
}

let greaterThanN = numbersGreaterThanN(numbers, n);

console.log("Dãy số lớn hơn số n:", greaterThanN);

// IIFE
(function numberGreaterThanN(arr = [], n = 0) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == n) {
            console.log(`Số bằng n: ${arr[i]}`)
            return `Số bằng n: ${arr[i]}`;
        }
    }

    return "Không có số nào trong dãy số bằng n";
})(numbers, n);

