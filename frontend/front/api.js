import { GoLogin  } from './utils.js';


export async function refreshAccessToken() 
{
    try 
    {
        const refreshToken = localStorage.getItem("refreshToken");
        // console.log("refreshToken in refreshAccessToken======", refreshToken);

            const response = await fetch(`/api/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        console.log("status in refreshToken function:", response.status);

        if (!response.ok) 
        {
            // alert("Session expired. Please log in again.");
            GoLogin();
        }
        else
        {
            const data = await response.json();
            console.log("New access token retrieved successfully.");
            localStorage.setItem("accessToken", data.access);
        }
    } 
    catch (error) 
    {
        console.error("Error occurred while refreshing the access token:", error.message);
        alert("Session expired. Please log in again.");
        GoLogin();
    }
}

export async function SecureApiRequest(endpoint, method = "GET", body = null) 
{
    let token = localStorage.getItem("accessToken");

    let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    let request = {
        method,
        headers,
    };

    if (body)
        request.body = JSON.stringify(body);

    try 
    {
        const response = await fetch(`${endpoint}`, request);

        if (response.status === 401) 
        {
            console.warn("Access token expired. Attempting to refresh...");

            await refreshAccessToken();
            token = localStorage.getItem("accessToken");
            headers.Authorization = `Bearer ${token}`;
            request.headers = headers;

            const retryResponse = await fetch(`${endpoint}`, request);

            if (retryResponse.ok) 
            {
                const data = await retryResponse.json();
                console.log("Request retried successfully after token refresh.");
                return data;
            }
            console.error("Retry after token refresh failed.");
            alert("Session expired. Please log in again.");
            GoLogin();
            return {"":""};
        }
        if (response.ok) 
        {
            const data = await response.json();
            return data;
        } 
    } 
    catch (error) 
    {
        console.error("Error in SecureApiRequest:", error.message);
        alert("An error occurred. Please try again.");
        throw error;
    }
}


