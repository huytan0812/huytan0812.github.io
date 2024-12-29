let a = [1, 2, 3, 4, 5, 6];
let temp;

for (let i = 0; i < a.length - 1; i++) {
    temp = a[i];
    a[i] = a[i + 1];
    a[i + 1] = temp;
}

a.length = a.length - 1;

console.log(a);