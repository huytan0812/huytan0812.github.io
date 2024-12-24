const a = parseInt(prompt("Nhập số a: "));
const b = parseInt(prompt("Nhập số b: "));
const x = parseInt(prompt("Nhập số x: "));

if (x < b) {
    for (let i = a; i < b; i++) {
        if (i % x == 0) {
            console.log("Số nhỏ nhất chia hết cho x:", i);
            break;
        }
    }
}
