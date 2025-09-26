document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    form.onsubmit = async (e) => { 
        e.preventDefault(); message.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const json = await res.json();
        if (res.ok && json.ok) {
            // redirect to app
            window.location.href = "/app";
            } else {
                message.textContent = json.message || "Login failed";
            }
        } catch (err) {
            console.error(err);
            message.textContent = "Server error";
        }
    };

});
