/*
Template Name: Niche
Author: UXLiner
*/
$(function() {
    "use strict";

// ======
// line chart
// ======	
var ctx = document.getElementById('line-chart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
           label: "My First dataset",
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(88, 103, 221)',
            data: [0, 10, 5, 2, 20, 30, 45],
                    fill: false,
                }, {
          label: "My Second dataset",
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 140, 211)',
            data: [15, 15, 10, 20, 30, 10, 25],
                }]
            },
	options: {
            responsive: true
        }
});

// ======
// Pie chart
// ======
new Chart(document.getElementById("pie-chart"),{
	type:'pie',
	data:{
		labels:
			['Red','Blue','Yellow'],
		datasets:
			[{'label':'My First Dataset',
		data:
			[300,50,100],
		backgroundColor:
			['rgb(255, 99, 132)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)'],
		}]
},
	options: {
            responsive: true
        }
});

// ======
// Doughnut chart
// ======
new Chart(document.getElementById('doughnut-chart'),{
	type:'doughnut',
	data:{
		labels:
		['Red','Blue','Yellow'],
	datasets:
		[{'label':'My First Dataset',
	data:
		[300,50,100],
	backgroundColor:
		['rgb(255, 99, 132)',
		'rgb(54, 162, 235)',
		'rgb(255, 205, 86)'],
		}]
},
	options: {
            responsive: true
        }
});
		

// ======
// PolarArea chart
// ======
new Chart(document.getElementById('polararea-chart'),{
	type:'polarArea',
	data:{
		labels:
		['Red','Green','Yellow','Grey','Blue'],
	datasets:
		[{'label':'My First Dataset',
	data:
		[11,16,7,3,14],
	backgroundColor:
	['rgb(255, 99, 132)',
	'rgb(75, 192, 192)',
	'rgb(255, 205, 86)',
	'rgb(201, 203, 207)',
	'rgb(54, 162, 235)'],
		}]
},
	options: {
            responsive: true
        }
});


// ======
// Radar chart
// ======
new Chart(document.getElementById('radar-chart'),{
	type:'radar',
	data:{
		labels:
			['Eating','Drinking','Sleeping','Designing','Coding','Cycling','Running'],
	datasets:
		[{'label':'My First Dataset',
	data:[65,59,90,81,56,55,40],
	fill:true,
	backgroundColor:'rgba(255, 99, 132, 0.2)',
	borderColor:'rgb(255, 99, 132)',
	pointBackgroundColor:'rgb(255, 99, 132)',
	pointBorderColor:'#fff',
	pointHoverBackgroundColor:'#fff',
	pointHoverBorderColor:'rgb(255, 99, 132)'},{
	label:'My Second Dataset',
	data:[28,48,40,19,96,27,100],
	fill:true,
	backgroundColor:'rgba(54, 162, 235, 0.2)',
	borderColor:'rgb(54, 162, 235)',
	pointBackgroundColor:'rgb(54, 162, 235)',
	pointBorderColor:'#fff',
	pointHoverBackgroundColor:'#fff',
	pointHoverBorderColor:'rgb(54, 162, 235)'}]},
	options:{
		elements:{
		line:{
		tension:0,
		borderWidth:3,
		responsive: true,
	}}}});
// ======
// Bar chart
// ======	
var ctx = document.getElementById('bar-chart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(88, 103, 221)',
            borderColor: 'rgb(88, 103, 221)',
            data: [0, 10, 5, 2, 20, 30, 45],
                    fill: false,
                }, {
            label: "My Second dataset",
            backgroundColor: 'rgb(0, 140, 211)',
            borderColor: 'rgb(0, 140, 211)',
            data: [15, 15, 10, 20, 30, 10, 25],
                }]
            },
	options: {
            responsive: true
        }
});
})(jQuery);


function updatePersonnelList(event) {
    // Eğer event bir DOM olayı ise, doğru şekilde sinemaID'yi alın
    const sinemaID = event.target ? event.target.value : event;

    if (!sinemaID) {
        console.error('Şube ID alınamadı!');
        return;
    }

    // API çağrısı
    fetch(`/personeller/${sinemaID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Hatası: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const personnelList = document.getElementById('personnelList');
            if (!personnelList) {
                console.error('Personel listesi elemanı bulunamadı!');
                return;
            }

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
