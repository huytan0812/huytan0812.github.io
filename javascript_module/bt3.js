let d = 0;

for (let a = 0; a <= 50; a++) {
    console.log("a: ", a);
    d += a;
    if (a % 2 == 0) {
        console.log("Số chẵn: ", a);
        continue;
    }
    console.log("Số lẻ: ", a);
}

console.log("d: ", d);

for (let e = 50; e >= 0; e -= 1) {
    console.log("e: ", e);
}