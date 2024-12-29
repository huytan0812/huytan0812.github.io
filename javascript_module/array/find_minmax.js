numbers = [10, 4, -7, 9, 100, 3, -21, 0, 33];

let min = numbers[0];
let max = numbers[0];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
    if (numbers[i] < min) {
        min = numbers[i];
    }
}

console.log("Min:", min);
console.log("Max:", max);