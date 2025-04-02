document.getElementById("checkButton").addEventListener("click", async function() {
    let url = document.getElementById("urlInput").value;
    const apiUrl = "https://urlhaus-api.abuse.ch/v1/url/";

    let response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: url })
    });

    let data = await response.json();
    let resultText = data.query_status === "ok" ? "🚨 Phishing detected!" : "✅ Safe!";
    document.getElementById("result").innerText = resultText;
});
