let n;
let isPrime = true;

do {
    n = parseInt(prompt("Nhập n: "));
}
while (n < 1);

for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
        console.log(n , " không phải là số nguyên tố");
        isPrime = false;
        break;
    }
}

if (isPrime) {
    console.log(n, " là số nguyên tố");
}