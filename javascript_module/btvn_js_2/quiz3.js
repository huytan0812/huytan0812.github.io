let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum = 0;
let min = a[0];

for (let i = 0; i < a.length; i++) {
    if (a[i] % 2 == 0) {
        console.log("Số chẵn:", a[i]);
    }
    sum += a[i];
    if (a[i] < min) {
        min = a[i];
    }
}

console.log("Tổng:", sum);
console.log("Số nhỏ nhất:", min);