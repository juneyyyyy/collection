async function warnUser() {
    let url = window.location.href;
    const apiUrl = "https://urlhaus-api.abuse.ch/v1/url/";

    let response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: url })
    });

    let data = await response.json();
    if (data.query_status === "ok") {
        alert("⚠ WARNING: This site is flagged as phishing!");
    }
}

warnUser();
