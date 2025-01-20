document.addEventListener('DOMContentLoaded', () => {
    // Chartist.js için
    const chartistContainer = document.querySelector('#chart1');
    if (chartistContainer) {
        new Chartist.Line(chartistContainer, {
            labels: ['Jan', 'Feb', 'Mar'],
            series: [[5, 10, 15]]
        }, {
            width: '400px',
            height: '200px'
        });
    } else {
        console.error('Chartist.js container bulunamadı!');
    }

    // Chart.js için
    const canvasElement = document.getElementById('karZararChartCanvas');
    if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Kar-Zarar',
                    data: [1000, 2000, 3000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                }]
            },
            options: {
                responsive: true
            }
        });
    } else {
        console.error('Canvas elemanı bulunamadı!');
    }
});
