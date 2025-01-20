// Verileri almak ve grafiği güncellemek için bir fonksiyon tanımlayalım
function updateChart(sinemaID) {
    fetch(`/sinemalar-gelirleri/${sinemaID}`)
        .then(response => response.json())
        .then(data => {
            // Gelen verileri Chart.js'e uygun formata dönüştürelim
            const labels = data.map(item => `Ay ${item.ay}`);
            const gelirData = data.map(item => item.gelir);

            // Grafiği güncelle
            chart.data.labels = labels;
            chart.data.datasets[0].data = gelirData;
            chart.update();
        })
        .catch(error => console.error('API Hatası:', error));
}

// Sayfa yüklendiğinde çalışan ana kod
(function () {
    "use strict";

    // Varsayılan şubeyi seç
    const sinemaSelect = document.getElementById('sinemaSelect');
    const ctx = document.getElementById('altiAylikGelirGrafik').getContext('2d');

    // Grafik şablonunu oluştur
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Bu kısımlar fetch çağrısından gelen verilerle dolacak
            datasets: [
                {
                    label: "Gelirler",
                    borderColor: 'rgb(88, 103, 221)',
                    data: [],
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Aylar'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gelir (TL)'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Varsayılan şube gelirlerini yükle
    updateChart(sinemaSelect.value);

    // Şube değiştirildiğinde grafiği güncelle
    sinemaSelect.addEventListener('change', (event) => {
        updateChart(event.target.value);
    });
});

// Verileri almak ve grafiği güncellemek için bir fonksiyon tanımlayalım
function updateBarChart(sinemaID) {
    fetch(`/sinemalar-gelirleri/${sinemaID}`)
        .then(response => response.json())
        .then(data => {
            // Gelen verileri Chart.js'e uygun formata dönüştürelim
            const labels = data.map(item => `Ay ${item.ay}`);
            const gelirData = data.map(item => item.gelir);

            // Grafiği güncelle
            if (barChart) {
                barChart.data.labels = labels;
                barChart.data.datasets[0].data = gelirData;
                barChart.update();
            } else {
                barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Aylık Gelirler',
                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                data: gelirData,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Aylar'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Gelir (TL)'
                                },
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('API Hatası:', error));
}

// Sayfa yüklendiğinde çalışan ana kod
(function () {
    "use strict";

    const sinemaSelect = document.getElementById('sinemaSelect');
    const ctx = document.getElementById('barChartCanvas').getContext('2d');
    let barChart;

    // Varsayılan şube gelirlerini yükle
    updateBarChart(sinemaSelect.value);

    // Şube değiştirildiğinde grafiği güncelle
    sinemaSelect.addEventListener('change', (event) => {
        updateBarChart(event.target.value);
    });
});



// Personel Listesi Güncelleme
function updatePersonnelList(sinemaID) {
    fetch(`/personeller/${sinemaID}`)
        .then(response => response.json())
        .then(data => {
            const personnelList = document.getElementById('personnelList');
            if (!personnelList) {
                console.error('personnelList elemanı bulunamadı!');
                return;
            }
            personnelList.innerHTML = '';

            if (data.length === 0) {
                personnelList.innerHTML = '<li>Bu şube için personel bulunamadı.</li>';
            } else {
                data.forEach(personel => {
                    const li = document.createElement('li');
                    li.textContent = personel.ad_soyad;
                    personnelList.appendChild(li);
                });
            }
        })
        .catch(error => console.error('API Hatası:', error));
}

