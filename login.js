function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const form = event.target;
    const btn = form?.querySelector('button[type="submit"]');
    const prevText = btn?.textContent || 'Login';
    const resultEl = document.getElementById('result');
    if (resultEl) {
        resultEl.textContent = '';
        resultEl.style.color = '';
    }
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Logging in...';
    }

    // Safe fallback if config.js fails to load.
    const MS_API_BASE = ((window.MS_API_BASE && String(window.MS_API_BASE)) || 'https://music-showcase-server.onrender.com')
        .replace(/\/+$/, '');

    fetch(`${MS_API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    })
    .then(async (res) => {
        let data = { success: false, message: 'Invalid server response' };
        try {
            data = await res.json();
        } catch {}

        if (res.ok && data.success) {
            if (resultEl) {
                resultEl.style.color = '#3cba54';
                resultEl.textContent = 'Login successful. Redirecting...';
            }
            window.location.href = './member.html';
        } else {
            const msg = data.message || 'Wrong username or password';
            if (resultEl) {
                resultEl.style.color = '#d9534f';
                resultEl.textContent = `Access Denied: ${msg}`;
            } else {
                alert(`Access Denied: ${msg}`);
            }
        }
    })
    .catch(err => {
        if (resultEl) {
            resultEl.style.color = '#d9534f';
            resultEl.textContent = `Error contacting server: ${err.message}`;
        } else {
            alert(`Error contacting server: ${err.message}`);
        }
    })
    .finally(() => {
        if (btn) {
            btn.disabled = false;
            btn.textContent = prevText;
        }
    });
}
