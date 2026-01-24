const token = localStorage.getItem('token');
const mission = document.getElementById("number_mission");
const client = document.getElementById("number_client");
const description = document.getElementById("description");
const city = document.getElementById("city");
const start = document.getElementById("start");
const duration = document.getElementById("duration");
const statusUser = document.getElementById("status");
const urgency = document.getElementById("urgency");

async function getMission() {
    const response = await fetch('/api/dashboard', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-Type": "application/json"
        }
    })
    const data = await response.json();
    console.log(data.getmission)
    if (response.ok) {
        const dataMission = data.getmission;
        dataMission.forEach(mission => {
            
            const idMission = data.id_mission;
            const descriptionMission = data.description;
            const cityMission = data.city;
            const startMission = data.start_date;
            const durationMission = data.duration;
            const clientMission = data.id_client;
            const statusMission = data.status;
            const urgencyMission = data.urgency;
            
            mission.textContent = idMission;
            description.textContent = descriptionMission;
            city.textContent = cityMission;
            start.textContent = startMission;
            duration.textContent = durationMission;
            client.textContent = clientMission;
            statusUser.textContent = statusMission;
        });
        urgency.textContent = urgencyMission;
    } else {
        const error = await response.json();
        alert("Erreur : " + error.error);
    }
}

getMission();