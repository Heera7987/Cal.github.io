document.getElementById('value1').addEventListener('input', calculate);
document.getElementById('value2').addEventListener('input', calculate);

function calculate() {
    const value1 = parseFloat(document.getElementById('value1').value);
    const value2 = parseFloat(document.getElementById('value2').value);

    if (!isNaN(value1) && !isNaN(value2)) {
        const difference = Math.abs(value1 - value2); // दोनों वैल्यू में अंतर

        // मुद्रांक शुल्क (5%)
        const fivePercent = difference * 0.05;

        // ब्लाक शुल्क और उपकर हमेशा 0
        const onePercent = 0;
        const fivePercentOfTwelve = 0;

        // योग (eStamp)
        const totalSum = fivePercent + onePercent + fivePercentOfTwelve;

        // 4% फीस (दोनों वैल्यू में से जो बड़ी है, उस पर)
        const maxValue = Math.max(value1, value2);
        const fourPercentFee = maxValue * 0.04;

        // परिणाम दिखाएं
        document.getElementById('fivePercent').textContent = fivePercent.toFixed(2);
        document.getElementById('onePercent').textContent = onePercent.toFixed(2);
        document.getElementById('fivePercentOfTwelve').textContent = fivePercentOfTwelve.toFixed(2);
        document.getElementById('totalSum').textContent = totalSum.toFixed(2);
        document.getElementById('fourPercentFee').textContent = fourPercentFee.toFixed(2);
    } else {
        // अगर वैल्यू नहीं दर्ज की गई है, तो सभी फ़ील्ड्स खाली करें
        document.getElementById('fivePercent').textContent = '0';
        document.getElementById('onePercent').textContent = '0';
        document.getElementById('fivePercentOfTwelve').textContent = '0';
        document.getElementById('totalSum').textContent = '0';
        document.getElementById('fourPercentFee').textContent = '0';
    }
}