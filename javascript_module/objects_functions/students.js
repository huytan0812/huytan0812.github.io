let students = {
    'id': 123,
    'age': 18,
    'name:': "Antony",
    languages: ['vn', 'en'],
    scores: {
        math: 6,
        physics: 7,
        english: 8
    }
}

let average = 0;

for (let key in students.scores) {
    average += students.scores[key];
}

average /= Object.keys(students.scores).length;

let ranking = "";

if (average >= 8) {
    ranking = "Giỏi";
}
else if (average >= 6.5) {
    ranking = "Khá";
}
else if (average >= 5) {
    ranking = "Trung bình";
}
else {
    ranking = "Yếu";
}

console.log(
    `Id: ${students['id']},
    Tuổi: ${students['age']},
    Tên: ${students['name']},
    Ngôn ngữ: ${students['languages']},
    Điểm trung bình: ${average},
    Xếp loại học lực: ${ranking}
    `
);

