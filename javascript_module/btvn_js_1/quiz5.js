let n = parseInt(prompt("Nhập n: "));
let total = (1/2);

for (let i = 2; i <= n; i++) {
    console.log("i:", i, " i + 1:", i + 1);
    total += 1/(i*(i + 1));
}

console.log("Giá trị của biểu thức: ", total);