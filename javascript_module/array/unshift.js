let a = [1, 2, 3, 4, 5, 6];

a[a.length] = 7;
let temp;

for (let i = a.length - 1; i > 0; i--) {
    temp = a[i - 1];
    a[i - 1] = a[i];
    a[i] = temp;
}

console.log(a);