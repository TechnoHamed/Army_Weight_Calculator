// تبديل بين الوضع النهاري والليلي
document.getElementById('toggleMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// التحكم بحجم النص
let currentFontSize = 1;
document.getElementById('increaseTextSize').addEventListener('click', function () {
    currentFontSize += 0.1;
    document.body.style.fontSize = currentFontSize + 'em';
});

document.getElementById('decreaseTextSize').addEventListener('click', function () {
    currentFontSize = Math.max(0.8, currentFontSize - 0.1);
    document.body.style.fontSize = currentFontSize + 'em';
});

// عند الضغط على زر "احسب"
document.getElementById('calculatorForm').addEventListener('submit', function (e) {
    e.preventDefault();
    calculate();
});

function calculate() {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    if (isNaN(height) || isNaN(weight) || height < 100 || weight < 30) {
        alert('يرجى إدخال قيم منطقية للطول والوزن.');
        return;
    }

    const results = [];
    for (let ratio = 1.2; ratio <= 1.6; ratio += 0.1) {
        const excessWeight = ((height - 100) * ratio).toFixed(1);
        const acceptableWeight = ((height - 100) * ratio * 0.5).toFixed(1);

        let status = '';
        if (weight < acceptableWeight) {
            status = 'وزن ناقص (إعفاء) <i class="fas fa-exclamation-circle table-icon text-danger"></i>';
        } else if (weight > excessWeight) {
            status = 'وزن زائد (إعفاء) <i class="fas fa-times-circle table-icon text-danger"></i>';
        } else {
            status = 'لائق للخدمة <i class="fas fa-check-circle table-icon text-success"></i>';
        }

        results.push({
            ratio: ratio.toFixed(1),
            acceptableWeight,
            excessWeight,
            status
        });
    }

    displayResults(results);
}

function displayResults(results) {
    let table = `
        <table class="table table-striped table-bordered mt-4">
            <thead class="table-light">
                <tr>
                    <th scope="col">النسبة</th>
                    <th scope="col">الوزن المقبول</th>
                    <th scope="col">الوزن الزائد</th>
                    <th scope="col">الحالة</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach(result => {
        let rowClass = result.status.includes('إعفاء') ? 'table-danger' : 'table-success';
        table += `
            <tr class="${rowClass}">
                <td>${result.ratio}</td>
                <td>${result.acceptableWeight}</td>
                <td>${result.excessWeight}</td>
                <td>${result.status}</td>
            </tr>
        `;
    });

    table += '</tbody></table>';
    document.getElementById('result').innerHTML = table;
}

// مشاركة الصورة
function shareImage() {
    const imageSrc = document.getElementById('resultImage').src;
    if (navigator.share) {
        navigator.share({
            title: 'نتائجي',
            text: 'مشاركة نتائجي من حاسبة الوزن والطول.',
            files: [new File([imageSrc], 'نتائجي.png', { type: 'image/png' })],
            url: window.location.href
        }).catch(error => console.log('Error sharing', error));
    } else {
        alert('المشاركة غير مدعومة في هذا المتصفح.');
    }
}

