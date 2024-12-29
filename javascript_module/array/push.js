let a = [1, 2, 3, 4, 5, 6];

a[a.length] = 7;

for (let i = 0; i < a.length; i++) {
    console.log(`a[${i}] =`, a[i]);
}

console.log(a.length);