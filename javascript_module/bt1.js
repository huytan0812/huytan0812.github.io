let n = prompt("Nhập vào 1 số n: ");
if (n > 0 && n < 10) {
    if (n > 9) {
        alert("Xuất sắc");
    }
    else if (n >= 8.5) {
        alert("Giỏi");
    }
    else if (n >= 8) {
        alert("Tiệm cận tốt");
    }
    else if (n >= 7.5) {
        alert("Hơi khá");
    }
    else if (n >= 7) {
        alert("Khá");
    }
    else if (n >= 6.5) {
        alert("Trung bình khá");
    }
    else if (n >= 5) {
        alert("Trung bình");
    }
    else if (n >= 4) {
        alert("Yếu");
    }
    else {
        alert("Kém");
    }
}
else {
    alert("Điểm số không hợp lệ");
}