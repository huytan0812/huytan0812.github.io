let s = [];

let n;
let text;

do {
    n = parseInt(prompt("Nhập kích thước của mảng: "));
}
while (n < 1);

do {
    text = prompt("Nhập chuỗi: ");
    s.push(text);
}
while (s.length < n);

console.log(s);

function findShortestStr(arr = []) {
    let result = arr[0];

    for (let text of arr) {
        if (text.length < result.length) {
            result = text;
        }
    }

    return result;
}

let shortestStr = findShortestStr(s);

console.log("Chuỗi có độ dài nhỏ nhất:", shortestStr);

text = prompt("Kiểm tra xem chuỗi này có tồn tại trong mảng hay không: ");

function isExisted(arr = [], text) {
    for (let str of arr) {
        if (text == str) {
            return true;
        }
    }

    return false;
}

console.log(isExisted(s, text) ? `Chuỗi "${text}" có tồn tại trong mảng` : `Chuỗi "${text}" không tồn tại trong mảng`);

let newS = new Array(s.length);

for (let i = 0; i < newS.length; i++) {
    newS[i] = s[i].slice(0, 3);
}

console.log("Mảng mới:", newS);

let combineS = s.join("-");

console.log(combineS);