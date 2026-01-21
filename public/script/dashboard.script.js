import { response } from "express";

const description = document.getElementById("description");
const city = document.getElementById("city");
const start = document.getElementById("start");
const duration = document.getElementById("duration");
const status = document.getElementById("status");
const urgency = document.getElementById("urgency");

async function getMission() {
    await fetch('/api/dashboard', {
        headers: {
            "authorization":`bearer : ${token}`,
            "content-Type":"application/json"
        },
        body: JSON.stringify({})
    }
    )
}