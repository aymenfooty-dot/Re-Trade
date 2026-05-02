// Function to fetch the avatar and log in
async function findRobloxAccount() {
    const username = document.getElementById('username-input').value.trim();
    
    if (username.length < 3) {
        alert("Please enter a valid Roblox username.");
        return;
    }

    // Show loading state
    document.getElementById('search-btn').classList.add('hidden');
    document.getElementById('search-loader').classList.remove('hidden');

    // Roblox Thumbnail API URL (Headshot)
    // This is a "shorthand" URL that Roblox's servers resolve automatically
    const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?height=150&width=150&format=png&username=${username}`;

    // We "pre-load" the image to make sure it exists
    const img = new Image();
    img.src = avatarUrl;

    img.onload = function() {
        // Success! Save to memory and show the site
        localStorage.setItem('retrade_user', username);
        localStorage.setItem('retrade_avatar', avatarUrl);
        enterDashboard(username, avatarUrl);
    };

    img.onerror = function() {
        alert("Account not found. Please check the spelling.");
        document.getElementById('search-btn').classList.remove('hidden');
        document.getElementById('search-loader').classList.add('hidden');
    };
}

function enterDashboard(name, url) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-site').classList.remove('hidden');
    
    // Update all profile pictures and names on the site
    document.getElementById('nav-avatar').src = url;
    document.getElementById('profile-avatar').src = url;
    document.getElementById('profile-name').innerText = name;
    
    // Smooth fade in
    document.getElementById('main-site').style.opacity = "1";
}

// Auto-login if they already signed in before
window.onload = () => {
    const savedUser = localStorage.getItem('retrade_user');
    const savedAvatar = localStorage.getItem('retrade_avatar');
    if (savedUser && savedAvatar) {
        enterDashboard(savedUser, savedAvatar);
    }
};

