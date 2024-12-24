let sum1 = 0;
for (let i = 1; i <= 50; i++) {
    sum1 += i;
}
console.log("Tổng các số từ 1 đén 50: ", sum1);

let sum2 = 0;
for (let i = -10; i <= 50; i++) {
    sum2 += i;
}
console.log("Tổng các số chẵn từ -10 đến 50: ", sum2);

for (let i = -100; i <= 100; i++) {
    if (i % 9 == 0) {
        console.log("Số chia hết cho 9: ", i);
    }
}

let count = 1;
while (count <= 200) {
    console.log(count);
    count++;
}

let text = prompt("Nhập chuỗi: ");
let n = parseInt(prompt("Nhập số n: "));
let diff = n - text.length;

if (diff >= 0) {
    for (let i = 0; i < diff; i++) {
        text += "a";
    }
}

console.log(text);
console.log(text.length, n);

let x;
let y;

do {
    x = parseInt(prompt("Nhập x: "));
    y = parseInt(prompt("Nhập y: "));
}
while (x >= y);

console.log("Start")
while (x < y) {
    console.log("x: ", x, " y ", y);
    x++;
    y--;
}

console.log("End");
console.log("x: ", x, " y ", y)