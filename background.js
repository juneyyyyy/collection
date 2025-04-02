// Function to check if a URL is malicious using URLhaus API
async function checkUrl(url) {
    const apiUrl = "https://urlhaus-api.abuse.ch/v1/url/";
    let response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: url })
    });

    let data = await response.json();
    return data.query_status === "ok"; // True if URL is malicious
}

// Handle blocking malicious sites using declarativeNetRequest
chrome.runtime.onInstalled.addListener(() => {
    // You can periodically check the URLhaus API for new phishing sites and update the rules
    setInterval(async () => {
        // Example: Fetch URLs from URLhaus API
        const maliciousUrls = await fetchMaliciousUrls();
        
        // Build dynamic blocking rules for malicious URLs
        const rules = maliciousUrls.map((url, index) => ({
            id: index + 1, // Ensure each rule has a unique id
            action: {
                type: "block"
            },
            condition: {
                urlFilter: url, // Blocking the malicious URL
                resourceTypes: ["main_frame"]
            }
        }));

        // Add new rules to declarativeNetRequest
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules
        });

        console.log("Updated blocking rules:", rules);
    }, 10 * 60 * 1000); // Update every 10 minutes (adjust as needed)
});

// Fetch malicious URLs from URLhaus (could be updated for different APIs or strategies)
async function fetchMaliciousUrls() {
    // Example: Get URLs from URLhaus API (replace with actual API call)
    const apiUrl = "https://urlhaus-api.abuse.ch/v1/urls/recent/";
    let response = await fetch(apiUrl);
    let data = await response.json();
    return data.urls.map(url => url.url); // Assuming the API returns a list of URLs
}
