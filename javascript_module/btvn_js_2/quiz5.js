let a = [1, 2, 3, 4, 5];

let n;

do {
    n = parseInt(prompt("Nhập n:"));
}
while (n <= 2);

a.length += n;

for (let i = a.length - 1; i >= 0; i--) {
    if (i - n >= 0) {
        a[i] = a[i - n];
    }
    else {
        a[i] = 0;
    }
}

console.log(a);