document.addEventListener('DOMContentLoaded', function() {
    // Quản lý Tuyển sinh
    document.getElementById('calculateAdmission').addEventListener('click', function() {
        const benchmark = parseFloat(document.getElementById('benchmark').value);
        const subject1 = parseFloat(document.getElementById('subject1').value);
        const subject2 = parseFloat(document.getElementById('subject2').value);
        const subject3 = parseFloat(document.getElementById('subject3').value);
        const area = document.getElementById('area').value.toUpperCase();
        const object = parseInt(document.getElementById('object').value);
        
        // Tính điểm ưu tiên
        let areaBonus = 0;
        switch(area) {
            case 'A': areaBonus = 2; break;
            case 'B': areaBonus = 1; break;
            case 'C': areaBonus = 0.5; break;
            default: areaBonus = 0;
        }
        
        let objectBonus = 0;
        switch(object) {
            case 1: objectBonus = 2.5; break;
            case 2: objectBonus = 1.5; break;
            case 3: objectBonus = 1; break;
            default: objectBonus = 0;
        }
        
        const totalScore = subject1 + subject2 + subject3 + areaBonus + objectBonus;
        const hasZero = subject1 === 0 || subject2 === 0 || subject3 === 0;
        const passed = totalScore >= benchmark && !hasZero;
        
        const resultDiv = document.getElementById('admissionResult');
        resultDiv.innerHTML = `
            <p><strong>Tổng điểm:</strong> ${totalScore.toFixed(1)}</p>
            <p><strong>Kết quả:</strong> ${passed ? 'Đậu' : 'Rớt'}</p>
            ${hasZero ? '<p class="warning">Lưu ý: Có môn bị điểm 0</p>' : ''}
        `;
        resultDiv.classList.remove('hidden');
    });

    // Tính Thuế Thu nhập cá nhân
    document.getElementById('calculateTax').addEventListener('click', function() {
        const fullName = document.getElementById('fullName').value;
        const income = parseFloat(document.getElementById('income').value);
        const dependents = parseInt(document.getElementById('dependents').value);
        
        const taxableIncome = income - 4 - dependents * 1.6;
        let tax = 0;
        
        if (taxableIncome <= 60) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 120) {
            tax = 60 * 0.05 + (taxableIncome - 60) * 0.1;
        } else if (taxableIncome <= 210) {
            tax = 60 * 0.05 + 60 * 0.1 + (taxableIncome - 120) * 0.15;
        } else if (taxableIncome <= 384) {
            tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + (taxableIncome - 210) * 0.2;
        } else if (taxableIncome <= 624) {
            tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + 174 * 0.2 + (taxableIncome - 384) * 0.25;
        } else if (taxableIncome <= 960) {
            tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + 174 * 0.2 + 240 * 0.25 + (taxableIncome - 624) * 0.3;
        } else {
            tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + 174 * 0.2 + 240 * 0.25 + 336 * 0.3 + (taxableIncome - 960) * 0.35;
        }
        
        const resultDiv = document.getElementById('taxResult');
        resultDiv.innerHTML = `
            <p><strong>Họ tên:</strong> ${fullName}</p>
            <p><strong>Thu nhập chịu thuế:</strong> ${taxableIncome.toFixed(2)} triệu</p>
            <p><strong>Thuế phải nộp:</strong> ${tax.toFixed(2)} triệu</p>
        `;
        resultDiv.classList.remove('hidden');
    });

    // Hóa đơn Cáp
    document.getElementById('customerType').addEventListener('change', function() {
        const isBusiness = this.value === 'business';
        document.getElementById('businessConnectionsGroup').classList.toggle('hidden', !isBusiness);
    });

    document.getElementById('calculateBill').addEventListener('click', function() {
        const customerId = document.getElementById('customerId').value;
        const customerType = document.getElementById('customerType').value;
        const premiumChannels = parseInt(document.getElementById('premiumChannels').value);
        const connections = parseInt(document.getElementById('connections').value) || 0;
        
        let bill = 0;
        let details = '';
        
        if (customerType === 'resident') {
            bill = 4.5 + 20.5 + (premiumChannels * 7.5);
            details = `
                <p>Phí xử lý hóa đơn: $4.50</p>
                <p>Phí dịch vụ cơ bản: $20.50</p>
                <p>Kênh cao cấp (${premiumChannels} kênh): $${(premiumChannels * 7.5).toFixed(2)}</p>
            `;
        } else {
            const baseService = connections <= 10 ? 75 : 75 + (connections - 10) * 5;
            bill = 15 + baseService + (premiumChannels * 50);
            details = `
                <p>Phí xử lý hóa đơn: $15.00</p>
                <p>Phí dịch vụ cơ bản (${connections} kết nối): $${baseService.toFixed(2)}</p>
                <p>Kênh cao cấp (${premiumChannels} kênh): $${(premiumChannels * 50).toFixed(2)}</p>
            `;
        }
        
        const resultDiv = document.getElementById('billResult');
        resultDiv.innerHTML = `
            <p><strong>Mã KH:</strong> ${customerId}</p>
            <p><strong>Loại KH:</strong> ${customerType === 'resident' ? 'Nhà dân' : 'Doanh nghiệp'}</p>
            ${details}
            <p class="total"><strong>Tổng cộng:</strong> $${bill.toFixed(2)}</p>
        `;
        resultDiv.classList.remove('hidden');
    });

    // Tính Tiền điện
    document.getElementById('calculateElectricity').addEventListener('click', function() {
        const customerName = document.getElementById('customerName').value;
        const electricityUsage = parseInt(document.getElementById('electricityUsage').value);
        
        let total = 0;
        let remaining = electricityUsage;
        
        if (remaining > 0) {
            const first50 = Math.min(remaining, 50);
            total += first50 * 500;
            remaining -= first50;
        }
        
        if (remaining > 0) {
            const next50 = Math.min(remaining, 50);
            total += next50 * 650;
            remaining -= next50;
        }
        
        if (remaining > 0) {
            const next100 = Math.min(remaining, 100);
            total += next100 * 850;
            remaining -= next100;
        }
        
        if (remaining > 0) {
            const next150 = Math.min(remaining, 150);
            total += next150 * 1100;
            remaining -= next150;
        }
        
        if (remaining > 0) {
            total += remaining * 1300;
        }
        
        const resultDiv = document.getElementById('electricityResult');
        resultDiv.innerHTML = `
            <p><strong>Tên KH:</strong> ${customerName}</p>
            <p><strong>Số Kw:</strong> ${electricityUsage}</p>
            <p><strong>Tiền điện:</strong> ${total.toLocaleString()} đồng</p>
        `;
        resultDiv.classList.remove('hidden');
    });
});