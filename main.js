$(document).ready(function convert() {

    let optFrom = document.getElementById('from');
    let optTo = document.getElementById('to');

    const url = 'https://free.currencyconverterapi.com/api/v5/countries';




    fetch(url, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain'
            })
        }).then(response => {
            if (response.status !== 200) {
                console.log("There seems to be a problem");
                return;
            }

            return response.json();
        })
        .then(results => {
            for (const result in results) {
                for (const sm in results[result]) {
                    optFrom.innerHTML += `<option value='${results[result][sm]["currencyId"]}'>${results[result][sm]["currencyName"]} ( ${results[result][sm]["currencySymbol"]} )</option>`;
                    optTo.innerHTML += `<option value='${results[result][sm]["currencyId"]}' >${results[result][sm]["currencyName"]} ( ${results[result][sm]["currencySymbol"]} )</option>`;
                }
            }
        })
        .catch(err => console.log(JSON.stringify(err)));
});



/**
 * Convert currency function
 */

function convertCurrency() {
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let froGeld = document.getElementById("number1").value;
    let toGeld = document.getElementById("text");

    const convUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=ultra`;
    //  const twoWay = `https://www.currencyconverterapi.com/api/v5/convert?q=${from}_${to},${to}_${from}&compact=ultra`;

    fetch(convUrl).then(response => {
            if (response.status !== 200) {
                console.log("There seems to be a problem");
                return;
            }


            return response.json();
        }).then(rates => {

            const compact = Math.round(Object.values(rates) * 100) / 100;
            const con = Math.round((froGeld * compact) * 100) / 100;
            // const inverse = Math.round((toGeld / compact) * 100) / 100;

            toGeld.value = con;
            // froGeld.value = inverse;


        })
        .catch(err => console.log(JSON.stringify(err)));


}

/** 
 * Register service Worker
 */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js', { scope: '/' })
        .then(registration => {
            console.log("Service worker Registered");
        })
        .catch(err => {
            console.log("Service worker Failed to Register", err);
        });
}
