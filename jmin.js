function convert() {
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    let result;

    // रूपांतरण कारक
    const dismilToSqft = 435.6; // 1 डिसमिल = 435.6 वर्ग फीट
    const sqftToSqm = 0.092903; // 1 वर्ग फीट = 0.092903 वर्ग मीटर
    const sqmToHectare = 0.0001; // 1 वर्ग मीटर = 0.0001 हेक्टेयर
    const sqmToAcre = 0.000247105; // 1 वर्ग मीटर = 0.000247105 एकड़
    const hectareToAcre = 2.47105; // 1 हेक्टेयर = 2.47105 एकड़

    // सभी इकाइयों को वर्ग मीटर में बदलें
    let valueInSqm;

    switch (fromUnit) {
        case 'dismil':
            valueInSqm = value * dismilToSqft * sqftToSqm;
            break;
        case 'sqft':
            valueInSqm = value * sqftToSqm;
            break;
        case 'sqm':
            valueInSqm = value;
            break;
        case 'hectare':
            valueInSqm = value * 10000; // 1 हेक्टेयर = 10,000 वर्ग मीटर
            break;
        case 'acre':
            valueInSqm = value / sqmToAcre; // 1 एकड़ = 4046.86 वर्ग मीटर
            break;
        default:
            valueInSqm = 0;
    }

    // वर्ग मीटर से वांछित इकाई में बदलें
    switch (toUnit) {
        case 'dismil':
            result = valueInSqm / (dismilToSqft * sqftToSqm);
            break;
        case 'sqft':
            result = valueInSqm / sqftToSqm;
            break;
        case 'sqm':
            result = valueInSqm;
            break;
        case 'hectare':
            result = valueInSqm * sqmToHectare;
            break;
        case 'acre':
            result = valueInSqm * sqmToAcre;
            break;
        default:
            result = 'अमान्य रूपांतरण';
    }

    // परिणाम दिखाएं
    document.getElementById('result').innerText = `परिणाम: ${result.toFixed(2)} ${toUnit}`;
}