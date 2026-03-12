let studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;


let total = mark1 + mark2 + mark3;


const calculateAverage = (m1, m2, m3) => {
    return ((m1 + m2 + m3) / 3).toFixed(2);
};

let average = calculateAverage(mark1, mark2, mark3);

console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${total}`);
console.log(`Average Marks: ${average}`);