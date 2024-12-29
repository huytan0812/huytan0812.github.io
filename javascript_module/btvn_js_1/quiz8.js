let m;
let n;

do {
    m = parseInt(prompt("Nhập m:"));
    n = parseInt(prompt("Nhập n:"));
}
while (m <= 0 || n <= 0);

let GCF = 0;

if (m < n) {
    for (let i = 1; i <= m; i++) {
        if (m % i == 0 && n % i == 0) {
            GCF = i;
        }
    }
}
else {
    for (let i = 1; i <= n; i++) {
        if (m % i == 0 && n % i == 0) {
            GCF = i;
        }
    }
}

console.log("ƯCLN của m và n: ", GCF);