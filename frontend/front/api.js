import { GoLogin  } from './utils.js';

export async function refreshAccessToken() 
{
    console.log("refresh access token");
    try 
    {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("refreshAccessToken: ", refreshToken);

            const response = await fetch(`/api/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) 
        {
            alert("Failed to refresh the access token. Please log in again.");
    history.pushState({}, "", "/");
    handleLocation();

            // GoLogin();
        }

        const data = await response.json();

        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", data.access);
        console.log("Access token successfully refreshed.");
    } 
    catch (error) 
    {
        console.error("Error occurred while refreshing the access token:", error.message);
        alert("Session expired. Please log in again.");
        // GoLogin();
    }
}

export async function SecureApiRequest(endpoint, method = "GET", body = null) 
{
    const token = localStorage.getItem("accessToken");
    console.log("lasttime: ", token);
    if(token === null)
    {
        // GoLogin();
        alert("please login .....");
        return;
    }
    // console.log("access token: 2===================", token);
    // console.log("user of this account logout", token);
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const request = 
    {
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
            try 
            {
                await refreshAccessToken(); 
                return SecureApiRequest(endpoint, method, body); 
            } 
            catch 
            {
                console.error("Error refreshing access token.");
                alert("Authentication failed. Please log in again.");
                console.log("logout......")
                // GoLogin();
            }
        }
        if (response.ok) 
        {
            const data = await response.json();
            console.log("SecureApiRequest successful:", data);
            return data;
        }

        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.detail || "API error occurred.");
    } 
    catch (error) 
    {
        console.error("Error in SecureApiRequest:", error.message);
        alert("An error occurred. Please try again......");
        throw error; 
    }
}
