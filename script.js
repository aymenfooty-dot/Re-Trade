<script>
    window.onload = () => {
        const savedId = localStorage.getItem('retrade_id');
        const savedName = localStorage.getItem('retrade_user');
        if (savedId || savedName) renderDashboard(savedId || savedName, !!savedId);
    };

    function linkAccount() {
        const input = document.getElementById('profile-url-input').value.trim();
        const btn = document.getElementById('link-btn');
        const loader = document.getElementById('search-loader');
        
        if (input.length < 2) {
            alert("Please enter a username or profile link.");
            return;
        }

        btn.classList.add('hidden');
        loader.classList.remove('hidden');

        // Check if it's a Link or a Username
        const idMatch = input.match(/\/users\/(\d+)\//);
        
        setTimeout(() => {
            if (idMatch) {
                // It's a link - use the ID
                const userId = idMatch[1];
                localStorage.setItem('retrade_id', userId);
                localStorage.removeItem('retrade_user'); // Clear old name
                renderDashboard(userId, true);
            } else if (!input.includes("/") && !input.includes(".")) {
                // It looks like a username
                localStorage.setItem('retrade_user', input);
                localStorage.removeItem('retrade_id'); // Clear old ID
                renderDashboard(input, false);
            } else {
                // It's a broken link or invalid text
                alert("Please enter an existing Roblox profile or valid username.");
                btn.classList.remove('hidden');
                loader.classList.add('hidden');
            }
        }, 1200);
    }

    function renderDashboard(identifier, isId) {
        document.getElementById('login-screen').classList.add('hidden');
        const site = document.getElementById('main-site');
        site.classList.remove('hidden');
        setTimeout(() => site.style.opacity = "1", 100);
        
        // Determine which API URL to use based on if we have an ID or Username
        const avatarUrl = isId 
            ? `https://www.roblox.com/headshot-thumbnail/image?width=150&height=150&format=png&userId=${identifier}`
            : `https://www.roblox.com/headshot-thumbnail/image?width=150&height=150&format=png&username=${identifier}`;
        
        document.getElementById('nav-avatar').src = avatarUrl;
        document.getElementById('profile-avatar').src = avatarUrl;
        
        const displayName = isId ? "Verified ID User" : identifier;
        document.getElementById('profile-name').innerText = displayName;
        
        if(document.getElementById('user-id-display')) {
            document.getElementById('user-id-display').innerText = isId ? `Linked ID: ${identifier}` : `Username: ${identifier}`;
        }
    }

    function showTab(tab) {
        ['trade', 'market', 'profile'].forEach(t => {
            document.getElementById('section-' + t).classList.add('hidden');
            document.getElementById('tab-btn-' + t).classList.remove('active-tab', 'text-white');
            document.getElementById('tab-btn-' + t).classList.add('text-slate-500');
        });
        document.getElementById('section-' + tab).classList.remove('hidden');
        document.getElementById('tab-btn-' + tab).classList.add('active-tab', 'text-white');
    }

    function logout() { localStorage.clear(); location.reload(); }
</script>
