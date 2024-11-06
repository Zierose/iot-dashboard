// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh4TwsADp3u92HY5sShse4HBXqgZYrnDU",
  authDomain: "iot-educational-kit-for-bas.firebaseapp.com",
  projectId: "iot-educational-kit-for-bas",
  storageBucket: "iot-educational-kit-for-bas.firebasestorage.app",
  messagingSenderId: "1025862859032",
  appId: "1:1025862859032:web:ec0f206c49205fceec466d",
  measurementId: "G-3CJEQKZMX5"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Devices list (relay switches) with initial UI labels and Firestore document IDs
const devices = [
  { label: 'Light 1', id: 'light1' },
  { label: 'Light 2', id: 'light2' },
  { label: 'Fan', id: 'fan' },
  { label: 'Exhaust Fan', id: 'exhaustFan' },
  { label: 'Socket 1', id: 'socket1' },
  { label: 'Socket 2', id: 'socket2' },
  { label: 'Socket 3', id: 'socket3' },
  { label: 'Air Conditioner', id: 'ac' }
];

// Initialize UI and add switch elements
document.addEventListener("DOMContentLoaded", () => {
  const dashboardContainer = document.querySelector(".dashboard-container");

  devices.forEach(device => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${device.label}</h2>
      <button id="${device.id}-toggle" onclick="toggleDevice('${device.id}')">Toggle</button>
      <p>Status: <span id="${device.id}-status">--</span></p>
    `;
    dashboardContainer.appendChild(card);

    // Set up real-time listener for each device
    const deviceRef = doc(db, "devices", device.id);
    onSnapshot(deviceRef, (doc) => {
      const data = doc.data();
      const isOn = data && data.state;
      const toggleButton = document.getElementById(`${device.id}-toggle`);
      toggleButton.innerText = isOn ? "Turn Off" : "Turn On";
      document.getElementById(`${device.id}-status`).innerText = isOn ? "On" : "Off";
    });
  });
});

// Function to toggle each device
window.toggleDevice = async (deviceId) => {
  const deviceRef = doc(db, "devices", deviceId);

  try {
    const docSnapshot = await deviceRef.get();
    const currentState = docSnapshot.data()?.state || false;
    const newState = !currentState;

    await setDoc(deviceRef, { state: newState });
    console.log(`Successfully toggled ${deviceId} to ${newState ? "On" : "Off"}`);
  } catch (error) {
    console.error("Error updating device state: ", error);
  }
};
