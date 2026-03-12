function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const form = event.target;
    const btn = form?.querySelector('button[type="submit"]');
    const prevText = btn?.textContent || 'Login';
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Logging in...';
    }

    fetch('https://music-showcase-server.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
    .then(async (res) => {
        let data = { success: false, message: 'Invalid server response' };
        try {
            data = await res.json();
        } catch {}

        if (res.ok && data.success) {
            window.location.href = './member.html';
        } else {
            alert(`Access Denied: ${data.message || 'Wrong username or password'}`);
        }
    })
    .catch(err => alert(`Error contacting server: ${err.message}`))
    .finally(() => {
        if (btn) {
            btn.disabled = false;
            btn.textContent = prevText;
        }
    });
}
