for (let i = 1; i <= 500; i++) {
    console.log(i);
    if (i % 2 == 0) {
        console.log("Số chia hết cho 2: ", i);
    }
    if (i % 3 == 0) {
        console.log("Số chia hết cho 3: ", i);
    }
}

let sum1 = 0;
let count = 0;
for (let i = -30; i <= 50; i++) {
    if (i % 2 == 0) {
        sum1 += i;
        count++;
    }
}
console.log("Tổng các số chẵn trong đoạn [-30, 50]: ", sum1);
console.log("Tổng các số chẵn: ", count);

let factorial = 1;
let n;
do {
    n = parseInt(prompt("Nhập vào n giai thừa: "));
}
while (n < 0);

if (n <= 1) {
    console.log("Giai thừa của số n: ", factorial);
}

for (let i = 2; i <= n; i++) {
    factorial *= i;
}

console.log("Giai thừa của số n: ", factorial);