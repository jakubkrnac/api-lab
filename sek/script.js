const endPoint = 'https://api.apilayer.com/fixer/timeseries';
const apiKey = 'IZqmLGSu6ZPRpY93KYU7xuKCV4tKDvnE';

async function displayChart() {
    const ctx = document.getElementById('sek-to-eur').getContext('2d');

    let date = new Date();
    let endDate = date.toISOString().split('T')[0];

    date.setDate(date.getDate() - 14);
    let startDate = date.toISOString().split('T')[0];

    const url = `${endPoint}?start_date=${startDate}&end_date=${endDate}&base=SEK&symbols=EUR`

    console.log('fetching');

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'apikey': apiKey
        }
    });

    let json = await response.json();

    let rates = json['rates'];
    let dates = Object.keys(rates);
    let values = Object.values(rates);

    values.forEach((value, index) => values[index] = value['EUR']);

    dates.forEach((value, index) => {
        let date = new Date(value);
        dates[index] = date.getDate() + "." + (date.getMonth() + 1);
    });

    let gradientFill = ctx.createLinearGradient(0, 0, 0, 275);
    gradientFill.addColorStop(0, '#2074fa80');
    gradientFill.addColorStop(1, '#2074fa00');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                data: values,
                borderWidth: 4,
                borderColor: '#2074fa',
                fill: true,
                backgroundColor: gradientFill,
                tension: 0.1
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                x: {
                    grid: {
                        lineWidth: 2,
                        display: false,
                        drawTicks: false,
                    }
                },
                y: {
                    grid: {
                        display: false,
                        drawTicks: false,
                    },
                    ticks: {
                        precision: 3,
                        callback: value => value.toFixed(3) + ' \u20AC'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                legend: {
                    display: false,
                },
            },
            scaleShowVerticalLines: false
        }
    });
}
