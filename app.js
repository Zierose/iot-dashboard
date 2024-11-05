// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Define a function to update chart with new data
function updateChart(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Create the chart once the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Will be updated with data
            datasets: [{
                label: 'Sensor Data',
                data: [], // Will be updated with data
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Fetch data from Firebase Firestore and update the chart
    function fetchData() {
        db.collection("iotData").get().then((querySnapshot) => {
            const labels = [];
            const data = [];
            querySnapshot.forEach((doc) => {
                const record = doc.data();
                labels.push(record.timestamp); // Adjust as needed for your data
                data.push(record.value); // Adjust as needed for your data
            });
            // Update the chart with the fetched data
            updateChart(myChart, labels, data);
        });
    }

    // Call fetchData initially and then set it to refresh every 10 seconds
    fetchData();
    setInterval(fetchData, 10000); // Updates every 10 seconds
});
