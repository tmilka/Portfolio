/* =========================================
   SCOREBOARD CORE - FIREBASE LOGIC (MERGED)
   ========================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set, update, child, onValue } 
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDEH0yycrbMsc8RK64NlBWKPeCXqdxhOjo",
    authDomain: "website-60e8a.firebaseapp.com",
    databaseURL: "https://website-60e8a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "website-60e8a",
    storageBucket: "website-60e8a.firebasestorage.app",
    messagingSenderId: "972245003923",
    appId: "1:972245003923:web:8ebaff5ada13982c2fe766"
};

// 1. Initialisierung
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. DOM Elemente
const overviewHeader = document.querySelector("#overviewHeader");
const overviewBody = document.querySelector("#overviewBody");
const playerNameInput = document.querySelector("#playerNameInput");
const gameNameInput = document.querySelector("#gameNameInput");
const findNameInput = document.querySelector("#findNameInput");
const displayStats = document.querySelector("#displayStats");
const statusTag = document.getElementById("connection-status");

/* =========================================
   STATUS & LIVE-RELOAD
   ========================================= */

// Verbindung überwachen (für den Terminal-Header)
const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
    if (statusTag) {
        if (snap.val() === true) {
            statusTag.innerText = "ONLINE";
            statusTag.style.color = "#00ff41"; // Terminal Grün
        } else {
            statusTag.innerText = "OFFLINE";
            statusTag.style.color = "#ff3333"; // Error Rot
        }
    }
});

// Automatische Aktualisierung bei Datenänderung
const playersRef = ref(db, "Players");
onValue(playersRef, (snapshot) => {
    if (snapshot.exists()) {
        renderTable(snapshot.val());
    } else {
        if (overviewBody) {
            overviewBody.innerHTML = "<tr><td colspan='100%'>Keine Daten vorhanden</td></tr>";
        }
    }
});

/* =========================================
   TABELLEN-LOGIK
   ========================================= */

function renderTable(playersData) {
    if (!overviewHeader || !overviewBody) return;

    const players = Object.keys(playersData);
    const games = new Set();

    // Alle vorhandenen Spiele sammeln
    players.forEach(p => {
        if (playersData[p]) {
            Object.keys(playersData[p]).forEach(g => {
                if (g !== "_init") games.add(g); // Hilfsknoten ignorieren
            });
        }
    });

    // Header bauen
    overviewHeader.innerHTML = "<th>[DATA_POCKET]</th>";
    players.forEach(player => {
        overviewHeader.innerHTML += `<th>${player.toUpperCase()}</th>`;
    });

    // Body bauen
    overviewBody.innerHTML = "";
    games.forEach(game => {
        let row = `<tr><td><strong>${game}</strong></td>`;
        players.forEach(player => {
            const score = (playersData[player] && playersData[player][game] !== undefined) 
                          ? playersData[player][game] : 0;
            row += `
            <td>
                <div class="score-cell">
                    <button class="btn-circle" onclick="updateScore('${player}', '${game}', -1)">-</button>
                    <span class="score-value">${score}</span>
                    <button class="btn-circle" onclick="updateScore('${player}', '${game}', 1)">+</button>
                </div>
            </td>`;
        });
        row += "</tr>";
        overviewBody.innerHTML += row;
    });
}

/* =========================================
   AKTIONEN (Global gebunden für onclick)
   ========================================= */

// Score updaten
window.updateScore = function(player, game, change) {
    const scoreRef = ref(db, `Players/${player}/${game}`);
    get(scoreRef).then((snapshot) => {
        const currentScore = snapshot.exists() ? snapshot.val() : 0;
        set(scoreRef, currentScore + change);
    });
};

// Neuen Spieler hinzufügen
window.addPlayer = function() {
    const name = playerNameInput.value.trim();
    if (!name) return alert("Name eingeben!");

    get(ref(db, "Players")).then((snapshot) => {
        let initialData = { "_init": 0 }; // Platzhalter
        if (snapshot.exists()) {
            const playersData = snapshot.val();
            const firstPlayer = Object.values(playersData)[0];
            if (firstPlayer) {
                Object.keys(firstPlayer).forEach(game => initialData[game] = 0);
            }
        }
        set(ref(db, `Players/${name}`), initialData).then(() => {
            playerNameInput.value = "";
        });
    });
};

// Neues Spiel hinzufügen
window.addGame = function() {
    const gameName = gameNameInput.value.trim();
    if (!gameName) return alert("Spielname eingeben!");

    get(ref(db, "Players")).then((snapshot) => {
        if (snapshot.exists()) {
            const players = snapshot.val();
            const updates = {};
            Object.keys(players).forEach(player => {
                updates[`Players/${player}/${gameName}`] = 0;
            });
            update(ref(db), updates).then(() => {
                gameNameInput.value = "";
            });
        }
    });
};

// Spieler suchen / Query
window.findPlayer = function() {
    const name = findNameInput.value.trim();
    if (!name) return;
    
    get(child(ref(db), `Players/${name}`)).then((snapshot) => {
        if (snapshot.exists()) {
            displayStats.innerHTML = `<pre>${JSON.stringify(snapshot.val(), null, 2)}</pre>`;
        } else {
            displayStats.innerHTML = "SYSTEM_ERROR: Record not found.";
        }
    });
};

/* =========================================
   EVENT LISTENER
   ========================================= */
document.querySelector("#add")?.addEventListener("click", window.addPlayer);
document.querySelector("#addGameBtn")?.addEventListener("click", window.addGame);
document.querySelector("#find")?.addEventListener("click", window.findPlayer);