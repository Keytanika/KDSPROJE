/*
* ================
* This file should be included in all pages.
* It controls layout options and plugins.
* @license MIT <http://opensource.org/licenses/MIT>
*/
+function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var h=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new g(h))}if("string"==typeof b){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.layout",d={slimscroll:!0,resetHeight:!0},e={wrapper:".wrapper",contentWrapper:".content-wrapper",layoutBoxed:".layout-boxed",mainFooter:".main-footer",mainHeader:".main-header",sidebar:".sidebar",controlSidebar:".control-sidebar",fixed:".fixed",sidebarMenu:".sidebar-menu",logo:".main-header .logo"},f={fixed:"fixed",holdTransition:"hold-transition"},g=function(a){this.options=a,this.bindedResize=!1,this.activate()};g.prototype.activate=function(){this.fix(),this.fixSidebar(),a("body").removeClass(f.holdTransition),this.options.resetHeight&&a("body, html, "+e.wrapper).css({height:"auto","min-height":"100%"}),this.bindedResize||(a(window).resize(function(){this.fix(),this.fixSidebar(),a(e.logo+", "+e.sidebar).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){this.fix(),this.fixSidebar()}.bind(this))}.bind(this)),this.bindedResize=!0),a(e.sidebarMenu).on("expanded.tree",function(){this.fix(),this.fixSidebar()}.bind(this)),a(e.sidebarMenu).on("collapsed.tree",function(){this.fix(),this.fixSidebar()}.bind(this))},g.prototype.fix=function(){a(e.layoutBoxed+" > "+e.wrapper).css("overflow","hidden");var b=a(e.mainFooter).outerHeight()||0,c=a(e.mainHeader).outerHeight()+b,d=a(window).height(),g=a(e.sidebar).height()||0;if(a("body").hasClass(f.fixed))a(e.contentWrapper).css("min-height",d-b);else{var h;d>=g?(a(e.contentWrapper).css("min-height",d-c),h=d-c):(a(e.contentWrapper).css("min-height",g),h=g);var i=a(e.controlSidebar);void 0!==i&&i.height()>h&&a(e.contentWrapper).css("min-height",i.height())}},g.prototype.fixSidebar=function(){if(!a("body").hasClass(f.fixed))return void(void 0!==a.fn.slimScroll&&a(e.sidebar).slimScroll({destroy:!0}).height("auto"));this.options.slimscroll&&void 0!==a.fn.slimScroll&&(a(e.sidebar).slimScroll({destroy:!0}).height("auto"),a(e.sidebar).slimScroll({height:a(window).height()-a(e.mainHeader).height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"}))};var h=a.fn.layout;a.fn.layout=b,a.fn.layout.Constuctor=g,a.fn.layout.noConflict=function(){return a.fn.layout=h,this},a(window).on("load",function(){b.call(a("body"))})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(g))}"toggle"==b&&f.toggle()})}var c="lte.pushmenu",d={collapseScreenSize:767,expandOnHover:!1,expandTransitionDelay:200},e={collapsed:".sidebar-collapse",open:".sidebar-open",mainSidebar:".main-sidebar",contentWrapper:".content-wrapper",searchInput:".sidebar-form .form-control",button:'[data-toggle="push-menu"]',mini:".sidebar-mini",expanded:".sidebar-expanded-on-hover",layoutFixed:".fixed"},f={collapsed:"sidebar-collapse",open:"sidebar-open",mini:"sidebar-mini",expanded:"sidebar-expanded-on-hover",expandFeature:"sidebar-mini-expand-feature",layoutFixed:"fixed"},g={expanded:"expanded.pushMenu",collapsed:"collapsed.pushMenu"},h=function(a){this.options=a,this.init()};h.prototype.init=function(){(this.options.expandOnHover||a("body").is(e.mini+e.layoutFixed))&&(this.expandOnHover(),a("body").addClass(f.expandFeature)),a(e.contentWrapper).click(function(){a(window).width()<=this.options.collapseScreenSize&&a("body").hasClass(f.open)&&this.close()}.bind(this)),a(e.searchInput).click(function(a){a.stopPropagation()})},h.prototype.toggle=function(){var b=a(window).width(),c=!a("body").hasClass(f.collapsed);b<=this.options.collapseScreenSize&&(c=a("body").hasClass(f.open)),c?this.close():this.open()},h.prototype.open=function(){a(window).width()>this.options.collapseScreenSize?a("body").removeClass(f.collapsed).trigger(a.Event(g.expanded)):a("body").addClass(f.open).trigger(a.Event(g.expanded))},h.prototype.close=function(){a(window).width()>this.options.collapseScreenSize?a("body").addClass(f.collapsed).trigger(a.Event(g.collapsed)):a("body").removeClass(f.open+" "+f.collapsed).trigger(a.Event(g.collapsed))},h.prototype.expandOnHover=function(){a(e.mainSidebar).hover(function(){a("body").is(e.mini+e.collapsed)&&a(window).width()>this.options.collapseScreenSize&&this.expand()}.bind(this),function(){a("body").is(e.expanded)&&this.collapse()}.bind(this))},h.prototype.expand=function(){setTimeout(function(){a("body").removeClass(f.collapsed).addClass(f.expanded)},this.options.expandTransitionDelay)},h.prototype.collapse=function(){setTimeout(function(){a("body").removeClass(f.expanded).addClass(f.collapsed)},this.options.expandTransitionDelay)};var i=a.fn.pushMenu;a.fn.pushMenu=b,a.fn.pushMenu.Constructor=h,a.fn.pushMenu.noConflict=function(){return a.fn.pushMenu=i,this},a(document).on("click",e.button,function(c){c.preventDefault(),b.call(a(this),"toggle")}),a(window).on("load",function(){b.call(a(e.button))})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this);if(!e.data(c)){var f=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,new h(e,f))}})}var c="lte.tree",d={animationSpeed:500,accordion:!0,followLink:!1,trigger:".treeview a"},e={tree:".tree",treeview:".treeview",treeviewMenu:".treeview-menu",open:".menu-open, .active",li:"li",data:'[data-widget="tree"]',active:".active"},f={open:"menu-open",tree:"tree"},g={collapsed:"collapsed.tree",expanded:"expanded.tree"},h=function(b,c){this.element=b,this.options=c,a(this.element).addClass(f.tree),a(e.treeview+e.active,this.element).addClass(f.open),this._setUpListeners()};h.prototype.toggle=function(a,b){var c=a.next(e.treeviewMenu),d=a.parent(),g=d.hasClass(f.open);d.is(e.treeview)&&(this.options.followLink&&"#"!=a.attr("href")||b.preventDefault(),g?this.collapse(c,d):this.expand(c,d))},h.prototype.expand=function(b,c){var d=a.Event(g.expanded);if(this.options.accordion){var h=c.siblings(e.open),i=h.children(e.treeviewMenu);this.collapse(i,h)}c.addClass(f.open),b.slideDown(this.options.animationSpeed,function(){a(this.element).trigger(d)}.bind(this))},h.prototype.collapse=function(b,c){var d=a.Event(g.collapsed);b.find(e.open).removeClass(f.open),c.removeClass(f.open),b.slideUp(this.options.animationSpeed,function(){b.find(e.open+" > "+e.treeview).slideUp(),a(this.element).trigger(d)}.bind(this))},h.prototype._setUpListeners=function(){var b=this;a(this.element).on("click",this.options.trigger,function(c){b.toggle(a(this),c)})};var i=a.fn.tree;a.fn.tree=b,a.fn.tree.Constructor=h,a.fn.tree.noConflict=function(){return a.fn.tree=i,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(e,g))}"string"==typeof b&&f.toggle()})}var c="lte.controlsidebar",d={slide:!0},e={sidebar:".control-sidebar",data:'[data-toggle="control-sidebar"]',open:".control-sidebar-open",bg:".control-sidebar-bg",wrapper:".wrapper",content:".content-wrapper",boxed:".layout-boxed"},f={open:"control-sidebar-open",fixed:"fixed"},g={collapsed:"collapsed.controlsidebar",expanded:"expanded.controlsidebar"},h=function(a,b){this.element=a,this.options=b,this.hasBindedResize=!1,this.init()};h.prototype.init=function(){a(this.element).is(e.data)||a(this).on("click",this.toggle),this.fix(),a(window).resize(function(){this.fix()}.bind(this))},h.prototype.toggle=function(b){b&&b.preventDefault(),this.fix(),a(e.sidebar).is(e.open)||a("body").is(e.open)?this.collapse():this.expand()},h.prototype.expand=function(){this.options.slide?a(e.sidebar).addClass(f.open):a("body").addClass(f.open),a(this.element).trigger(a.Event(g.expanded))},h.prototype.collapse=function(){a("body, "+e.sidebar).removeClass(f.open),a(this.element).trigger(a.Event(g.collapsed))},h.prototype.fix=function(){a("body").is(e.boxed)&&this._fixForBoxed(a(e.bg))},h.prototype._fixForBoxed=function(b){b.css({position:"absolute",height:a(e.wrapper).height()})};var i=a.fn.controlSidebar;a.fn.controlSidebar=b,a.fn.controlSidebar.Constructor=h,a.fn.controlSidebar.noConflict=function(){return a.fn.controlSidebar=i,this},a(document).on("click",e.data,function(c){c&&c.preventDefault(),b.call(a(this),"toggle")})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(e,g))}if("string"==typeof b){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.boxwidget",d={animationSpeed:500,collapseTrigger:'[data-widget="collapse"]',removeTrigger:'[data-widget="remove"]',collapseIcon:"fa-minus",expandIcon:"fa-plus",removeIcon:"fa-times"},e={data:".box",collapsed:".collapsed-box",body:".box-body",footer:".box-footer",tools:".box-tools"},f={collapsed:"collapsed-box"},g={collapsed:"collapsed.boxwidget",expanded:"expanded.boxwidget",removed:"removed.boxwidget"},h=function(a,b){this.element=a,this.options=b,this._setUpListeners()};h.prototype.toggle=function(){a(this.element).is(e.collapsed)?this.expand():this.collapse()},h.prototype.expand=function(){var b=a.Event(g.expanded),c=this.options.collapseIcon,d=this.options.expandIcon;a(this.element).removeClass(f.collapsed),a(this.element).find(e.tools).find("."+d).removeClass(d).addClass(c),a(this.element).find(e.body+", "+e.footer).slideDown(this.options.animationSpeed,function(){a(this.element).trigger(b)}.bind(this))},h.prototype.collapse=function(){var b=a.Event(g.collapsed),c=this.options.collapseIcon,d=this.options.expandIcon;a(this.element).find(e.tools).find("."+c).removeClass(c).addClass(d),a(this.element).find(e.body+", "+e.footer).slideUp(this.options.animationSpeed,function(){a(this.element).addClass(f.collapsed),a(this.element).trigger(b)}.bind(this))},h.prototype.remove=function(){var b=a.Event(g.removed);a(this.element).slideUp(this.options.animationSpeed,function(){a(this.element).trigger(b),a(this.element).remove()}.bind(this))},h.prototype._setUpListeners=function(){var b=this;a(this.element).on("click",this.options.collapseTrigger,function(a){a&&a.preventDefault(),b.toggle()}),a(this.element).on("click",this.options.removeTrigger,function(a){a&&a.preventDefault(),b.remove()})};var i=a.fn.boxWidget;a.fn.boxWidget=b,a.fn.boxWidget.Constructor=h,a.fn.boxWidget.noConflict=function(){return a.fn.boxWidget=i,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var h=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new g(e,h))}if("string"==typeof f){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.todolist",d={iCheck:!1,onCheck:function(){},onUnCheck:function(){}},e={data:'[data-widget="todo-list"]'},f={done:"done"},g=function(a,b){this.element=a,this.options=b,this._setUpListeners()};g.prototype.toggle=function(a){if(a.parents(e.li).first().toggleClass(f.done),!a.prop("checked"))return void this.unCheck(a);this.check(a)},g.prototype.check=function(a){this.options.onCheck.call(a)},g.prototype.unCheck=function(a){this.options.onUnCheck.call(a)},g.prototype._setUpListeners=function(){var b=this;a(this.element).on("change ifChanged","input:checkbox",function(){b.toggle(a(this))})};var h=a.fn.todoList;a.fn.todoList=b,a.fn.todoList.Constructor=g,a.fn.todoList.noConflict=function(){return a.fn.todoList=h,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data(c);e||d.data(c,e=new f(d)),"string"==typeof b&&e.toggle(d)})}var c="lte.directchat",d={data:'[data-widget="chat-pane-toggle"]',box:".direct-chat"},e={open:"direct-chat-contacts-open"},f=function(a){this.element=a};f.prototype.toggle=function(a){a.parents(d.box).first().toggleClass(e.open)};var g=a.fn.directChat;a.fn.directChat=b,a.fn.directChat.Constructor=f,a.fn.directChat.noConflict=function(){return a.fn.directChat=g,this},a(document).on("click",d.data,function(c){c&&c.preventDefault(),b.call(a(this),"toggle")})}(jQuery);


// Sinemalar API'sinden veri çekme
function fetchSinemalar() {
    fetch('/sinemalar')
        .then(response => response.json())
        .then(data => {
            console.log('Sinemalar:', data);
            populateSinemaTable(data); // Tabloyu doldur
        })
        .catch(error => console.error('Sinemalar API Hatası:', error));
}

// Gelir ve Gider API'sinden veri çekme
function fetchGelirGider() {
    Promise.all([
        fetch('/gelirler').then(response => response.json()),
        fetch('/giderler').then(response => response.json())
    ])
    .then(([gelirler, giderler]) => {
        console.log('Gelirler:', gelirler);
        console.log('Giderler:', giderler);
        populateGelirGiderTable(gelirler, giderler); // Tabloyu doldur
    })
    .catch(error => console.error('Gelir/Gider API Hatası:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    const sinemaSecim = document.getElementById('sinemaSecim');
    const ctx = document.getElementById('altiAylikGelirGrafik').getContext('2d');
    let altiAylikGrafik;

    // Grafik Oluşturma Fonksiyonu
    function grafikOlustur(sinemaID) {
        fetch(`http://localhost:3001/son6aylik-gelir/${sinemaID}`)
            .then((response) => response.json())
            .then((data) => {
                const labels = data.map((item) => `Ay ${item.ay}`);
                const gelirVerileri = data.map((item) => item.toplamGelir);

                // Eğer grafik daha önce oluşturulmuşsa, güncelle
                if (altiAylikGrafik) {
                    altiAylikGrafik.data.labels = labels;
                    altiAylikGrafik.data.datasets[0].data = gelirVerileri;
                    altiAylikGrafik.update();
                } else {
                    // Yeni bir grafik oluştur
                    altiAylikGrafik = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Son 6 Aylık Gelir',
                                    data: gelirVerileri,
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 2,
                                    fill: false,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        },
                    });
                }
            })
            .catch((error) => console.error('API Hatası:', error));
    }

    // İlk şube için grafik oluştur
    grafikOlustur(sinemaSecim.value);

    // Şube değiştiğinde grafiği güncelle
    sinemaSecim.addEventListener('change', (event) => {
        const sinemaID = event.target.value;
        grafikOlustur(sinemaID);
    });
});





// Sinema Tablosunu Doldur
function populateSinemaTable(data) {
    const table = document.getElementById('sinema-table-body'); // Tablo gövdesi
    table.innerHTML = ''; // Önceki içeriği temizle
    data.forEach(sinema => {
        const row = `
            <tr>
                <td>${sinema.sinema_id}</td>
                <td>${sinema.sinema_adi}</td>
                <td>${sinema.lokasyon}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}



// Sayfa Yüklenirken Verileri Çek
document.addEventListener('DOMContentLoaded', () => {
    fetchSinemalar();
    fetchGelirGider();
});

// Personel sayısını kutucuğa yerleştir
function updatePersonelSayisi() {
    fetch('/personel/sayisi')
    .then(response => response.json())
    .then(data => {
        console.log('API Çıktısı:', data);
        const personelSayisiElement = document.getElementById('personel-sayisi');
        if (personelSayisiElement) {
            personelSayisiElement.textContent = data.personel_sayisi;
        }
    })
    .catch(error => console.error('Personel sayısı API hatası:', error));
}


// Sayfa yüklendiğinde personel sayısını güncelle
document.addEventListener('DOMContentLoaded', updatePersonelSayisi);

const personelSayisiElement = document.getElementById('personel-sayisi');

// Sinema sayısını kutucuğa yerleştir
function updateSinemaSayisi() {
    fetch('/sinema/sayisi')
        .then(response => response.json())
        .then(data => {
            const sinemaSayisiElement = document.getElementById('sinema-sayisi');
            if (sinemaSayisiElement) {
                sinemaSayisiElement.textContent = data.sinema_sayisi;
            }
        })
        .catch(error => console.error('Sinema sayısı API hatası:', error));
}

// Sayfa yüklendiğinde sinema sayısını güncelle
document.addEventListener('DOMContentLoaded', updateSinemaSayisi);

// En Çok Gelir Elde Eden Şubeyi Kutucuğa Yerleştir
function updateEnCokGelirSube() {
    fetch('/en-cok-gelir-sube')
        .then(response => response.json())
        .then(data => {
            const enCokGelirElement = document.getElementById('en-cok-gelir-sube');
            if (enCokGelirElement) {
                enCokGelirElement.textContent = data.sinema_adi || 'Bilinmiyor';
            }
        })
        .catch(error => console.error('En çok gelir elde eden şube API hatası:', error));
}

// Sayfa yüklendiğinde en çok gelir elde eden şubeyi güncelle
document.addEventListener('DOMContentLoaded', updateEnCokGelirSube);

// En Az Gelir Elde Eden Şubeyi Kutucuğa Yerleştir
function updateEnAzGelirSube() {
    fetch('/en-az-gelir-sube')
        .then(response => response.json())
        .then(data => {
            const enAzGelirElement = document.getElementById('en-az-gelir-sube');
            if (enAzGelirElement) {
                enAzGelirElement.textContent = data.sinema_adi || 'Bilinmiyor';
            }
        })
        .catch(error => console.error('En az gelir elde eden şube API hatası:', error));
}

// Sayfa yüklendiğinde en az gelir elde eden şubeyi güncelle
document.addEventListener('DOMContentLoaded', updateEnAzGelirSube);

// Şubelerin Kar-Zarar Verilerini Getir ve Line Chart Çiz
function createKarZararChart() {
    fetch('/kar-zarar-durumu')
        .then(response => response.json())
        .then(data => {
            // Chart.js için verileri hazırlayın
            const labels = data.map(item => item.sinema_adi); // Şube isimleri
            const karZararValues = data.map(item => item.kar_zarar); // Kar-Zarar değerleri

            // Chart.js kullanarak line chart oluştur
            const ctx = document.getElementById('karZararChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kar-Zarar Durumu',
                        data: karZararValues,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Şubeler'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Kar-Zarar (TL)'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Kar-Zarar API hatası:', error));
}

// Sayfa yüklendiğinde chart oluştur
document.addEventListener('DOMContentLoaded', createKarZararChart);

function createGelirPieChart() {
    fetch('/gelirler-pie')
        .then(response => response.json())
        .then(data => {
            // Verileri hazırlayın
            const labels = data.map(item => item.sinema_adi); // Şube isimleri
            const gelirValues = data.map(item => item.toplam_gelir); // Toplam gelir değerleri

            // Gelirler için renkler
            const backgroundColors = gelirValues.map(() => {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return `rgba(${r}, ${g}, ${b}, 0.6)`; // Rastgele renkler
            });

            // Pie chart oluştur
            const ctx = document.getElementById('gelirPieChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Toplam Gelirler',
                        data: gelirValues,
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            enabled: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Gelir Pie Chart API hatası:', error));
}

// Sayfa yüklendiğinde pie chart oluştur
document.addEventListener('DOMContentLoaded', createGelirPieChart);



function loadNotlar() {
    fetch('/notlar')
        .then(response => response.json())
        .then(data => {
            const notlarContainer = document.getElementById('notlarContainer');
            notlarContainer.innerHTML = ''; // Önceki notları temizle

            data.forEach(not => {
                const notDiv = document.createElement('div');
                notDiv.className = 'not';
                notDiv.innerHTML = `
                    <p>${not.icerik}</p>
                    <button onclick="editNot(${not.not_id}, '${not.icerik}')">Düzenle</button>
                    <button onclick="deleteNot(${not.not_id})">Sil</button>
                `;
                notlarContainer.appendChild(notDiv);
            });
        });
}

function addNot() {
    const notIcerik = document.getElementById('notIcerik').value;
    fetch('/notlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icerik: notIcerik })
    })
        .then(() => {
            document.getElementById('notIcerik').value = '';
            loadNotlar(); // Notları yeniden yükle
        });
}

function deleteNot(id) {
    fetch(`/notlar/${id}`, { method: 'DELETE' })
        .then(() => loadNotlar()); // Notları yeniden yükle
}

function editNot(id, eskiIcerik) {
    const yeniIcerik = prompt('Yeni not içeriğini girin:', eskiIcerik);
    if (yeniIcerik) {
        fetch(`/notlar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ icerik: yeniIcerik })
        })
            .then(() => loadNotlar()); // Notları yeniden yükle
    }
}

document.addEventListener('DOMContentLoaded', loadNotlar);






const sinemaSelect = document.getElementById('sinemaSelect');
const ctx = document.getElementById('lineChart').getContext('2d');

// Varsayılan Grafik
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Aylık Kar/Zarar',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});

// Açılır Menü Değişiminde Grafiği Güncelle
sinemaSelect.addEventListener('change', (event) => {
    const sinemaID = event.target.value;
    fetch(`/kar-zarar/${sinemaID}`)
        .then(response => response.json())
        .then(data => {
            console.log('Grafik Güncelleme Verisi:', data);

            const labels = data.map(item => `Ay ${item.ay}`);
            const karZararData = data.map(item => item.karZarar);

            chart.data.labels = labels;
            chart.data.datasets[0].data = karZararData;
            chart.update();
        })
        .catch(error => console.error('Grafik Güncelleme Hatası:', error));
});


// Dinamik Grafik Oluşturma ve Güncelleme Fonksiyonu
function createOrUpdateChart(chart, ctx, labels, data) {
    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    } else {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Aylık Gelirler',
                    data: data,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    }
}

// API'den Aylık Gelir Verilerini Getir ve Grafiği Güncelle
function fetchAndRenderChart(sinemaID, chart, ctx) {
    fetch(`/aylik-gelir/${sinemaID}`)
        .then(response => response.json())
        .then(data => {
            // 0. ay verilerini ayır
            const toplamGelir = data.find(item => item.ay === 0)?.toplamGelir || 0;

            // 0. ay haricindeki verileri filtrele
            const aylikGelirlerFiltered = data.filter(item => item.ay !== 0);

            console.log('Toplam Gelir (0. ay):', toplamGelir);
            console.log('Filtrelenmiş Veriler:', aylikGelirlerFiltered);

            // Etiketler ve veriler
            const labels = aylikGelirlerFiltered.map(item => `Ay ${item.ay}`);
            const gelirData = aylikGelirlerFiltered.map(item => item.toplamGelir);

            // Grafiği oluştur veya güncelle
            if (chart) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = gelirData;
                chart.update();
            } else {
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Aylık Gelirler',
                            data: gelirData,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true
                            }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Gelir Verisi Hatası:', error));
}

// Ana Fonksiyon: Sayfa Yüklendiğinde Çalışır
document.addEventListener('DOMContentLoaded', () => {
    const sinemaDropdown = document.getElementById('sinemaDropdown');
    const ctx = document.getElementById('sinemaGelirChart').getContext('2d');
    let gelirChart = null;

    // Varsayılan Şube Verisi
    fetchAndRenderChart(sinemaDropdown.value, gelirChart, ctx);

    // Şube Değiştirildiğinde Güncelle
    sinemaDropdown.addEventListener('change', (event) => {
        const sinemaID = event.target.value;
        fetchAndRenderChart(sinemaID, gelirChart, ctx);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const personelDropdown = document.getElementById('personelDropdown');
    const personelList = document.getElementById('personelList');

    // Şube değiştiğinde personel listesini güncelle
    personelDropdown.addEventListener('change', (event) => {
        const sinemaID = event.target.value;
        fetchPersoneller(sinemaID);
    });

    // Personel Verilerini Çek ve Listeyi Güncelle
    function fetchPersoneller(sinemaID) {
        fetch(`/personeller/${sinemaID}`)
            .then(response => response.json())
            .then(personeller => {
                // Listeyi temizle
                personelList.innerHTML = '';

                // Gelen personel verilerini listeye ekle
                if (personeller.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'Bu şube için çalışan bulunamadı.';
                    personelList.appendChild(li);
                } else {
                    personeller.forEach(personel => {
                        const li = document.createElement('li');
                        li.textContent = personel.ad_soyad;
                        personelList.appendChild(li);
                    });
                }
            })
            .catch(error => console.error('Personel Verisi Hatası:', error));
    }

    // Varsayılan olarak ilk şube personellerini yükle
    fetchPersoneller(personelDropdown.value);
});


document.addEventListener('DOMContentLoaded', () => {
    const personelDropdown = document.getElementById('personelDropdown');
    const personelList = document.getElementById('personelList');

    // Şube değiştiğinde personel listesini güncelle
    personelDropdown.addEventListener('change', (event) => {
        const sinemaID = event.target.value;
        fetchPersoneller(sinemaID);
    });

    // Personel Verilerini Çek ve Listeyi Güncelle
    function fetchPersoneller(sinemaID) {
        fetch(`/personeller/${sinemaID}`)
            .then(response => response.json())
            .then(data => {
                // Gelen veri array değilse, array'e çevir
                const personeller = Array.isArray(data) ? data : [data];

                // Listeyi temizle
                personelList.innerHTML = '';

                // Gelen personel verilerini listeye ekle
                if (personeller.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'Bu şube için çalışan bulunamadı.';
                    personelList.appendChild(li);
                } else {
                    personeller.forEach(personel => {
                        const li = document.createElement('li');
                        li.textContent = personel.ad_soyad;
                        personelList.appendChild(li);
                    });
                }
            })
            .catch(error => console.error('Personel Verisi Hatası:', error));
    }

    // Varsayılan olarak ilk şube personellerini yükle
    fetchPersoneller(personelDropdown.value);
});



document.addEventListener('DOMContentLoaded', () => {
    const sinemaDropdown = document.getElementById('sinemaDropdown');
    const ctx = document.getElementById('karZararLineChartCanvas').getContext('2d');
    let karZararChart3;
  
    sinemaDropdown.addEventListener('change', () => {
      const sinemaID = sinemaDropdown.value;
  
      fetch(`/kar-zarar/${sinemaID}`)
        .then(response => response.json())
        .then(data => {
          const labels = data.map(item => `Ay ${item.ay}`);
          const karZararData = data.map(item => item.toplamGelir);
  
          if (karZararChart3) {
            karZararChart3.data.labels = labels;
            karZararChart3.data.datasets[0].data = karZararData;
            karZararChart3.update();
          } else {
            karZararChart3 = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Aylık Kar/Zarar',
                    data: karZararData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                  },
                ],
              },
              options: {
                responsive: true,
              },
            });
          }
        })
        .catch(error => console.error('Grafik Hatası:', error));
    });
  });
  

  fetch(`/kar-zarar/${sinemaID}`)
    .then((response) => response.json())
    .then((data) => {
        console.log('API Response:', data);
    })
    .catch((error) => console.error('API Hatası:', error));

    fetch('/kar-zarar/1')
    .then(response => response.json())
    .then(data => console.log('API Response:', data))
    .catch(error => console.error('API Error:', error));


    document.addEventListener('DOMContentLoaded', () => {
        const sinemaSecim = document.getElementById('sinemaSecim');
        const ctx = document.getElementById('altiAylikGelirGrafik').getContext('2d');
        let altiAylikGrafik;
    
        // Grafik Oluşturma Fonksiyonu
        function grafikOlustur(sinemaID) {
            fetch(`http://localhost:3001/son6aylik-gelir/${sinemaID}`)
                .then((response) => response.json())
                .then((data) => {
                    const labels = data.map((item) => `Ay ${item.ay}`);
                    const gelirVerileri = data.map((item) => item.toplamGelir);
    
                    // Eğer grafik daha önce oluşturulmuşsa, güncelle
                    if (altiAylikGrafik) {
                        altiAylikGrafik.data.labels = labels;
                        altiAylikGrafik.data.datasets[0].data = gelirVerileri;
                        altiAylikGrafik.update();
                    } else {
                        // Yeni bir grafik oluştur
                        altiAylikGrafik = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Son 6 Aylık Gelir',
                                        data: gelirVerileri,
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 2,
                                        fill: false,
                                    },
                                ],
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            },
                        });
                    }
                })
                .catch((error) => console.error('API Hatası:', error));
        }
    
        // İlk şube için grafik oluştur
        grafikOlustur(sinemaSecim.value);
    
        // Şube değiştiğinde grafiği güncelle
        sinemaSecim.addEventListener('change', (event) => {
            const sinemaID = event.target.value;
            grafikOlustur(sinemaID);
        });
    });
    


    function updatePersonnelList() {
        const sinemaSelect = document.getElementById('sinemaSelect');
        const sinemaID = sinemaSelect ? sinemaSelect.value : null;
    
        if (!sinemaID) {
            console.error('Şube ID alınamadı!');
            return;
        }
    
        fetch(`/personeller/${sinemaID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Hatası: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const personnelList = document.getElementById('personnelList');
                personnelList.innerHTML = '';
    
                if (data.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'Bu şube için personel bulunamadı.';
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
    
