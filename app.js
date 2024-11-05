// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh4TwsADp3u92HY5sShse4HBXqgZYrnDU",
  authDomain: "iot-educational-kit-for-bas.firebaseapp.com",
  projectId: "iot-educational-kit-for-bas",
  storageBucket: "iot-educational-kit-for-bas.firebasestorage.app",
  messagingSenderId: "1025862859032",
  appId: "1:1025862859032:web:ec0f206c49205fceec466d",
  measurementId: "G-3CJEQKZMX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

// Lighting Control
function toggleLight(room, isOn) {
    const status = isOn ? "ON" : "OFF";
    alert(`The ${room} light is now ${status}`);
    // Here, you would add code to actually control the light via an API or Firebase.
}

// Climate Control - Update Temperature Display and Chart
function updateTemperature(value) {
    document.getElementById('temperatureDisplay').textContent = value;

    // Update temperature chart if using real data
    // Add new temperature value to the chart here if you integrate a live sensor
}

// Security Control - Toggle Door Lock
let isDoorLocked = true;

function toggleDoorLock() {
    isDoorLocked = !isDoorLocked;
    document.getElementById('doorLockStatus').textContent = isDoorLocked ? "Locked" : "Unlocked";
    alert(`The door is now ${isDoorLocked ? "locked" : "unlocked"}`);
    // You can add Firebase or API code here to control the lock
}
