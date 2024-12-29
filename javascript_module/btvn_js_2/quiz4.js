let n;

do {
    n = parseInt(prompt("Nhập n phần tử:"));
}
while (n <= 0);

let arr = [];

for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * n);
}

console.log(arr);