let a = [6, 7, 8, 9];

console.log(a[0]);
console.log(a[3]);

console.log(a[1] + a[2]);

let temp = a[1];
a[1] = a[3];
a[3] = temp;

console.log(a);

