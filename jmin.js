function convert() {
            const valueInput = document.getElementById('value').value;
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;

            // इनपुट मान्यता
            if (valueInput === "") {
                document.getElementById('result').innerText = "⚠️ कृपया एक मान दर्ज करें";
                document.getElementById('result').style.color = "#e74c3c";
                return;
            }

            const value = parseFloat(valueInput);
            
            if (isNaN(value)) {
                document.getElementById('result').innerText = "❌ कृपया एक वैध संख्या दर्ज करें";
                document.getElementById('result').style.color = "#e74c3c";
                return;
            }

            if (value < 0) {
                document.getElementById('result').innerText = "❌ कृपया एक धनात्मक संख्या दर्ज करें";
                document.getElementById('result').style.color = "#e74c3c";
                return;
            }

            let result;

            // रूपांतरण कारक
            const dismilToSqft = 435.6; // 1 डिसमिल = 435.6 वर्ग फीट
            const sqftToSqm = 0.092903; // 1 वर्ग फीट = 0.092903 वर्ग मीटर
            const sqmToHectare = 0.0001; // 1 वर्ग मीटर = 0.0001 हेक्टेयर
            const sqmToAcre = 0.000247105; // 1 वर्ग मीटर = 0.000247105 एकड़

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
                    valueInSqm = value * 4046.86; // 1 एकड़ = 4046.86 वर्ग मीटर
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

            // परिणाम दिखाएं - हेक्टेयर के लिए 4 दशमलव स्थान, अन्य के लिए 2
            let formattedResult;
            if (result === 'अमान्य रूपांतरण') {
                formattedResult = result;
                document.getElementById('result').style.color = "#e74c3c";
            } else if (toUnit === 'hectare') {
                formattedResult = result.toFixed(4);
                document.getElementById('result').style.color = "#2c3e50";
            } else {
                formattedResult = result.toFixed(2);
                document.getElementById('result').style.color = "#2c3e50";
            }
            
            document.getElementById('result').innerText = `✅ परिणाम: ${formattedResult} ${toUnit}`;
        }

        // इंटर के साथ स्वतः रूपांतरण जोड़ें
        document.getElementById('value').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                convert();
            }
        });

        // इनपुट या चयन बदलने पर भी रूपांतरण करें
        document.getElementById('value').addEventListener('input', convert);
        document.getElementById('fromUnit').addEventListener('change', convert);
        document.getElementById('toUnit').addEventListener('change', convert);

        // पेज लोड होने पर उदाहरण दिखाएं
        window.onload = function() {
            document.getElementById('value').value = "100";
            convert();
        };
