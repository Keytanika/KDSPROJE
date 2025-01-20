document.addEventListener('DOMContentLoaded', () => {
    const sinemaSecim = document.getElementById('sinemaSecim');
    const personnelList = document.getElementById('personnelList');

    if (!sinemaSecim || !personnelList) {
        console.error('HTML elemanları bulunamadı!');
        return;
    }

    function updatePersonnelList(sinemaID) {
        if (!sinemaID) {
            console.error('Geçersiz şube ID!');
            return;
        }

        // API'ye istek gönder
        fetch(`/personeller/${sinemaID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Hatası: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('API Yanıtı bir array değil!');
                }

                // Listeyi temizle
                personnelList.innerHTML = '';

                // Gelen verileri listeye ekle
                if (data.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'Bu şube için çalışan bulunamadı.';
                    personnelList.appendChild(li);
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

    // Varsayılan şube personellerini yükle
    updatePersonnelList(sinemaSecim.value);

    // Şube seçimi değiştiğinde personel listesini güncelle
    sinemaSecim.addEventListener('change', (event) => {
        updatePersonnelList(event.target.value);
    });
});
