let n;

do {
    n = parseInt(prompt("Nhập n: "));
} while (n <= 0 || n >= 100);

let result = (n % 2) == 0 ? "n là số chẵn" : "n là số lẻ";
alert(result);

let total = 0;
let m;
let count = 1;

do {
    m = parseInt(prompt("Nhập m: "));
    total += m;
    console.log(total);
    count++;
} while (m > 0 && count <= 5);

console.log("Kết quả cuối cùng: ", total);
