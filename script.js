// Updated dataset with "Class_Name" key
const data = [
  { "Class_Name": "Bare Land", "Loss": 12.4596, "Gain": 6.336, "Unchanged": 2.9655, "Changed": -2.064946889 },
  { "Class_Name": "Agriculture", "Loss": 8.7723, "Gain": 5.3136, "Unchanged": 2.3211, "Changed": -1.490112447 },
  { "Class_Name": "Vegetation", "Loss": 6.2226, "Gain": 17.5716, "Unchanged": 3.9258, "Changed": 2.890875745 },
  { "Class_Name": "Fellow Land", "Loss": 2.7792, "Gain": 1.6434, "Unchanged": 0.7533, "Changed": -1.50776583 },
  { "Class_Name": "HSP", "Loss": 22.1067, "Gain": 21.2184, "Unchanged": 30.384, "Changed": -0.029235782 },
  { "Class_Name": "Settlement", "Loss": 16.1082, "Gain": 19.1952, "Unchanged": 70.479, "Changed": 0.043800281 },
  { "Class_Name": "Water Body", "Loss": 4.626, "Gain": 1.7964, "Unchanged": 7.0326, "Changed": -0.402354748 }
];

// Table rendering
const headers = Object.keys(data[0]);
document.getElementById('table-head').innerHTML =
  `<tr>${headers.map(h => `<th>${h.replace('_', ' ')}</th>`).join('')}</tr>`;

document.getElementById('data-table').innerHTML =
  data.map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('');

// Bar chart (Gain vs Loss)
Plotly.newPlot('barChart', [
  {
    x: data.map(d => d.Class_Name),
    y: data.map(d => d.Gain),
    name: 'Gain',
    type: 'bar',
    marker: { color: '#2ca02c' }
  },
  {
    x: data.map(d => d.Class_Name),
    y: data.map(d => d.Loss),
    name: 'Loss',
    type: 'bar',
    marker: { color: '#d62728' }
  }
],);

// Pie chart
function drawPieChart(type) {
  const values = type === 'Changed'
    ? data.map(d => Math.abs(d.Changed))
    : data.map(d => d.Unchanged);

  const labels = data.map(d => d.Class_Name);

  Plotly.newPlot('pieChart', [{
    values: values,
    labels: labels,
    type: 'pie',
    hole: 0.4,
    textinfo: 'label+percent',
    pull: 0.05,
    marker: {
      colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0']
    }
  }], );
}

// Animate update
function updatePieChart(type) {
  const values = type === 'Changed'
    ? data.map(d => Math.abs(d.Changed))
    : data.map(d => d.Unchanged);

  Plotly.animate('pieChart', {
    data: [{ values: values }],
   
  }, {
    transition: { duration: 600, easing: 'cubic-in-out' },
    frame: { duration: 400 }
  });
}

// Initial load
drawPieChart('Changed');

// Dropdown handler
document.getElementById('valueTypeSelect').addEventListener('change', (e) => {
  updatePieChart(e.target.value);
});

// Dark mode toggle
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});






  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  