// Select the canvas element
const ctx = document.getElementById('myChart').getContext('2d');

// Create a new Chart instance
const myChart = new Chart(ctx, {
    type: 'line', // Change to 'bar', 'pie', etc., for different types
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
        datasets: [{
            label: 'Sensor Data',
            data: [12, 19, 3, 5, 2, 3], // Y-axis data points
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            borderWidth: 2, // Line thickness
            fill: false // Whether to fill under the line
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});
