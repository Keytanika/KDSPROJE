document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('altiAylikGiderGrafik')?.getContext('2d'); // Gider grafiği için doğru <canvas> elemanını seçin.
    if (!ctx) {
        console.error('altiAylikGiderGrafik elemanı bulunamadı!');
        return;
    }

    let lineChart; // Mevcut grafiği saklamak için bir değişken

    function updateLineChart(sinemaID) {
        if (!sinemaID) {
            console.error('Geçersiz sinema ID!');
            return;
        }

        fetch(`/sinemalar-giderleri/${sinemaID}`) // Aylık gider API'sine bağlanıyoruz
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Hatası: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Çizgi Grafik Aylık Gider API Yanıtı:', data); // Yanıtı kontrol edin

                const labels = data.map(item => `Ay ${item.ay}`); // Aylar
                const values = data.map(item => item.gider); // Aylık gider değerleri

                if (lineChart) {
                    // Mevcut grafiği güncelle
                    lineChart.data.labels = labels;
                    lineChart.data.datasets[0].data = values;
                    lineChart.update();
                } else {
                    // Yeni grafik oluştur
                    lineChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels,
                            datasets: [{
                                label: 'Aylık Giderler',
                                data: values,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 2,
                                fill: false,
                            }],
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: { beginAtZero: true },
                            },
                        },
                    });
                }
            })
            .catch(error => console.error('Çizgi Grafik API Hatası:', error));
    }

    // İlk şube için grafik yükle
    const sinemaSecim = document.getElementById('sinemaSecim');
    if (sinemaSecim) {
        updateLineChart(sinemaSecim.value);

        // Şube değiştiğinde grafik güncellenir
        sinemaSecim.addEventListener('change', (event) => {
            updateLineChart(event.target.value);
        });
    }
});











document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('barChartCanvas')?.getContext('2d');
    if (!ctx) {
        console.error('barChartCanvas elemanı bulunamadı!');
        return;
    }

    let barChart;

    function updateBarChart(sinemaID) {
        fetch(`/sinemalar-giderleri/${sinemaID}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => `Ay ${item.ay}`);
                const values = data.map(item => item.gider);

                if (barChart) {
                    barChart.data.labels = labels;
                    barChart.data.datasets[0].data = values;
                    barChart.update();
                } else {
                    barChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels,
                            datasets: [{
                                label: 'Aylık Giderler',
                                data: values,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            }],
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: { beginAtZero: true },
                            },
                        },
                    });
                }
            })
            .catch(error => console.error('API Hatası:', error));
    }

    // İlk şube için grafik yükle
    const sinemaSecim = document.getElementById('sinemaSecim');
    if (sinemaSecim) {
        updateBarChart(sinemaSecim.value);
        sinemaSecim.addEventListener('change', (event) => {
            updateBarChart(event.target.value);
        });
    }
});

