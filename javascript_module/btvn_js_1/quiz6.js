let n;

do {
    n = parseInt(prompt("Nhập n: "));
}
while (n <= 0);

for (let i = 1; i <= n; i++) {
    if (n % i == 0) {
        console.log("Ước số của", n, " :", i);
    }
}