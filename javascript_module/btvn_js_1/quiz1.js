let text = prompt("Nói gì đi: ");
console.log(text.length);
while (text.length <= 8) {
    text = prompt("Ngắn quá, dài thêm tí nữa");
}
alert("Chuỗi này ok");

let age = parseInt(prompt("Nhập tuổi của bạn: "));
if (age >= 18) {
    alert("Đủ 18 thì quẩy tiếp");
}
else if (age >= 16) {
    alert("Đợi thêm ít năm nữa");
}
else {
    alert("Còn quá trẻ");
}


