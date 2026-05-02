    window.onload = function() {
    const session = localStorage.getItem('retrade_session');
    if (session) {
        const data = JSON.parse(session);
        startHub(data.val, data.isId);
    }
};

function handleLogin() {
    const val = document.getElementById('user-entry').value.trim();
    const btn = document.getElementById('login-btn');
    const load = document.getElementById('loading-box');

    if (val.length < 2) return alert("Please enter a username.");

    btn.classList.add('hidden');
    load.classList.remove('hidden');

    const idMatch = val.match(/\/users\/(\d+)\//);
    
    setTimeout(() => {
        let isId = false;
        let cleanVal = val;

        if (idMatch) {
            cleanVal = idMatch[1];
            isId = true;
        } else if (val.includes("/") || val.includes(".")) {
            alert("Please enter an existing Roblox profile!");
            btn.classList.remove('hidden');
            load.classList.add('hidden');
            return;
        }

        localStorage.setItem('retrade_session', JSON.stringify({val: cleanVal, isId: isId}));
        startHub(cleanVal, isId);
    }, 1200);
}

function startHub(id, isId) {
    document.getElementById('auth-screen').classList.add('hidden');
    const hub = document.getElementById('main-interface');
    hub.classList.remove('hidden');
    setTimeout(() => hub.style.opacity = "1", 50);

    const img = isId 
        ? `https://www.roblox.com/headshot-thumbnail/image?width=150&height=150&format=png&userId=${id}`
        : `https://www.roblox.com/headshot-thumbnail/image?width=150&height=150&format=png&username=${id}`;

    document.getElementById('nav-pfp').src = img;
    document.getElementById('main-avatar').src = img;
    document.getElementById('profile-name').innerText = isId ? "ID User" : id;
}

function setGame(name) {
    document.getElementById('game-blox').classList.remove('active');
    document.getElementById('game-demon').classList.remove('active');
    if (name === 'Blox Fruits') document.getElementById('game-blox').classList.add('active');
    else document.getElementById('game-demon').classList.add('active');
    document.getElementById('current-game-title').innerText = name + " Trade";
}

function changeView(view) {
    ['trade', 'market', 'user'].forEach(v => {
        document.getElementById('view-' + v).classList.add('hidden');
        document.getElementById('tab-' + v).classList.remove('active-tab', 'text-white');
    });
    document.getElementById('view-' + view).classList.remove('hidden');
    document.getElementById('tab-' + view).classList.add('active-tab', 'text-white');
}

function logout() { localStorage.clear(); location.reload(); }
