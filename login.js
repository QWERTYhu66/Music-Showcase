function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://music-showcase-server.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(async (res) => {
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server responded with status ${res.status}: ${errorText}`);
        }
        return res.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = './member.html';
        } else {
            alert(`Access Denied: ${data.message}`);
        }
    })
    .catch(err => alert(`Error contacting server: ${err.message}`));
}
