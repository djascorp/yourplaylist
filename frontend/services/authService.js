export const registerUser = async (username, email, password) => {
    const response = await fetch("https://yourapi.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register.");
    }

    return response.json();
};

export const loginUser = async (email, password) => {
    const response = await fetch("https://yourapi.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login.");
    }

    return response.json();
};