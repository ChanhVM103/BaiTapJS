// main.js
let mainArray = [];
let floatArray = [];

// Hàm tạo mảng từ input
function createArray() {
    const input = document.getElementById('arrayInput').value;
    mainArray = input.split(',').map(item => parseInt(item.trim()));
    document.getElementById('arrayDisplay').textContent = `Mảng hiện tại: [${mainArray.join(', ')}]`;
    document.getElementById('result').textContent = 'Mảng đã được tạo thành công!';
}

// 1. Tính tổng các số dương trong mảng
function sumPositiveNumbers() {
    const sum = mainArray.reduce((acc, num) => num > 0 ? acc + num : acc, 0);
    document.getElementById('result').textContent = `Tổng các số dương trong mảng: ${sum}`;
}

// 2. Đếm số lượng số dương trong mảng
function countPositiveNumbers() {
    const count = mainArray.filter(num => num > 0).length;
    document.getElementById('result').textContent = `Số lượng số dương trong mảng: ${count}`;
}

// 3. Tìm số nhỏ nhất trong mảng
function findMinNumber() {
    if (mainArray.length === 0) {
        document.getElementById('result').textContent = 'Mảng rỗng!';
        return;
    }
    const min = Math.min(...mainArray);
    document.getElementById('result').textContent = `Số nhỏ nhất trong mảng: ${min}`;
}

// 4. Tìm số dương nhỏ nhất trong mảng
function findMinPositiveNumber() {
    const positives = mainArray.filter(num => num > 0);
    if (positives.length === 0) {
        document.getElementById('result').textContent = 'Không có số dương nào trong mảng!';
        return;
    }
    const minPositive = Math.min(...positives);
    document.getElementById('result').textContent = `Số dương nhỏ nhất trong mảng: ${minPositive}`;
}

// 5. Tìm số chẵn cuối cùng trong mảng
function findLastEvenNumber() {
    for (let i = mainArray.length - 1; i >= 0; i--) {
        if (mainArray[i] % 2 === 0) {
            document.getElementById('result').textContent = `Số chẵn cuối cùng trong mảng: ${mainArray[i]}`;
            return;
        }
    }
    document.getElementById('result').textContent = 'Không tìm thấy số chẵn nào trong mảng! Kết quả: -1';
}

// 6. Đổi chỗ 2 giá trị trong mảng theo vị trí
function swapPositions() {
    const pos1 = parseInt(prompt("Nhập vị trí thứ nhất (0 - " + (mainArray.length - 1) + "):"));
    const pos2 = parseInt(prompt("Nhập vị trí thứ hai (0 - " + (mainArray.length - 1) + "):"));
    
    if (isNaN(pos1) || isNaN(pos2) || pos1 < 0 || pos1 >= mainArray.length || pos2 < 0 || pos2 >= mainArray.length) {
        document.getElementById('result').textContent = 'Vị trí không hợp lệ!';
        return;
    }
    
    [mainArray[pos1], mainArray[pos2]] = [mainArray[pos2], mainArray[pos1]];
    document.getElementById('arrayDisplay').textContent = `Mảng hiện tại: [${mainArray.join(', ')}]`;
    document.getElementById('result').textContent = `Đã đổi chỗ vị trí ${pos1} và ${pos2}!`;
}

// 7. Sắp xếp mảng theo thứ tự tăng dần
function sortArray() {
    mainArray.sort((a, b) => a - b);
    document.getElementById('arrayDisplay').textContent = `Mảng hiện tại: [${mainArray.join(', ')}]`;
    document.getElementById('result').textContent = 'Mảng đã được sắp xếp tăng dần!';
}

// Hàm kiểm tra số nguyên tố
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

// 8. Tìm số nguyên tố đầu tiên trong mảng
function findFirstPrime() {
    for (const num of mainArray) {
        if (isPrime(num)) {
            document.getElementById('result').textContent = `Số nguyên tố đầu tiên trong mảng: ${num}`;
            return;
        }
    }
    document.getElementById('result').textContent = 'Không tìm thấy số nguyên tố nào trong mảng! Kết quả: -1';
}

// 9. Nhập mảng số thực và đếm số nguyên trong đó
function countIntegersInFloatArray() {
    const input = prompt("Nhập mảng số thực (cách nhau bằng dấu phẩy):");
    if (!input) {
        document.getElementById('result').textContent = 'Bạn chưa nhập mảng số thực!';
        return;
    }
    
    floatArray = input.split(',').map(item => parseFloat(item.trim()));
    const count = floatArray.filter(num => Number.isInteger(num)).length;
    
    document.getElementById('result').textContent = `Mảng số thực: [${floatArray.join(', ')}]\nSố lượng số nguyên trong mảng: ${count}`;
}

// 10. So sánh số lượng số dương và số âm
function comparePositivesNegatives() {
    const positives = mainArray.filter(num => num > 0).length;
    const negatives = mainArray.filter(num => num < 0).length;
    
    let result;
    if (positives > negatives) {
        result = "Số dương nhiều hơn số âm";
    } else if (negatives > positives) {
        result = "Số âm nhiều hơn số dương";
    } else {
        result = "Số dương và số âm bằng nhau";
    }
    
    document.getElementById('result').textContent = `Số dương: ${positives}, Số âm: ${negatives}\n${result}`;
}

// Gán các hàm vào đối tượng window để có thể gọi từ HTML
window.createArray = createArray;
window.sumPositiveNumbers = sumPositiveNumbers;
window.countPositiveNumbers = countPositiveNumbers;
window.findMinNumber = findMinNumber;
window.findMinPositiveNumber = findMinPositiveNumber;
window.findLastEvenNumber = findLastEvenNumber;
window.swapPositions = swapPositions;
window.sortArray = sortArray;
window.findFirstPrime = findFirstPrime;
window.countIntegersInFloatArray = countIntegersInFloatArray;
window.comparePositivesNegatives = comparePositivesNegatives;