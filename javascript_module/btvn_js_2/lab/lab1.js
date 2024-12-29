let arr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

(function productOfArr(arr = []) {
    let result = 1;

    for (let number of arr) {
        result *= number;
    }

    console.log("Tích của mảng:", result);
    return result;
})(arr);

function findSmallestNumberDividedBy2(arr = []) {
    for (let number of arr) {
        if (number % 2 == 0) {
            return `Số chia hết cho 2 nhỏ nhất trong mảng: ${number}`;
        }
    }

    return "Không tìm thấy số nào chia hết cho 2 trong mảng";
};

console.log(findSmallestNumberDividedBy2(arr));

function findSmallestNumberDividedBy3(arr = []) {
    let result = 1;

    for (let number of arr) {
        if (number % 3 != 0) {
            continue;
        }
        if (number > result) {
            result = number;
        }
    }

    return result != 1 ? `Số chia hết cho 3 lớn nhất trong mảng: ${result}` : "Không tìm thấy số nào chia hết cho 3 trong mảng";
};

console.log(findSmallestNumberDividedBy3(arr));

function averageOfArr(arr = []) {
    let average = 0;

    for (let number of arr) {
        average += number;
    }

    return average / arr.length;
}

console.log(`Giá trị trung bình của mảng: ${averageOfArr(arr)}`);

function isPrime(n = 0) {
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

function primesOfArr(arr = []) {
    let primes = [];

    for (let number of arr) {
        if (isPrime(number)) {
            primes.push(number);
        }
    }

    return primes;
}

let primes = primesOfArr(arr);

console.log("Các số nguyên tố của mảng:", primes);

function isNumberLessThan10(arr = []) {
    for (let number of arr) {
        if (number < 10) {
            return true;
        }
    }

    return false;
}

console.log(isNumberLessThan10(arr) ? "Trong mảng có số nhỏ hơn 10" : "Trong mảng không có số nhỏ hơn 10");

function isNumberGreaterThan20(arr = []) {
    for (let number of arr) {
        if (number > 20) {
            return true;
        }
    }

    return false;
}

console.log(isNumberGreaterThan20(arr) ? "Trong mảng có số lớn hơn 20" : "Trong mảng không có số lớn hơn 20");

let n;

do {
    n = parseInt(prompt("Đoán 1 số có trong mảng: "));
}
while (!arr.includes(n));

console.log(n);

function generateRandormArr(n = 0) {
    let arr = new Array(n);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * n);
    }

    return arr;
}

let items;

do {
    items = parseInt(prompt("Nhập số lượng item cho mảng cần tạo: "));
}
while (items < 0);

let newArr = generateRandormArr(items);

console.log("Trước khi sắp xếp dùng thuật toán Bubble Sort:", newArr);

function bubbleSort(arr = []) {
    let temp;

    // Thực hiện arr.length outer loop
    for (let i = 0; i < arr.length; i++) {

        // Inner loop duyệt từ index 0 tới arr.length - 1 - i
        // -1 vì mình sử dụng item kế tiếp trong 1 vòng loop
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

console.log("Sau khi sắp xếp dùng Bubble Sort:", bubbleSort(newArr));