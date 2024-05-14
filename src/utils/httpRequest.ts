export async function sendRequest(url: string, method: 'POST' | 'PUT' | 'PATCH', token: string, body: any): Promise<any> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to ${method} data: ${errorData.message}`);
    }
    return response.json();
}

export async function sendGetRequest(url: string, method: 'GET', token: string, body: any): Promise<any> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to ${method} data: ${errorData.message}`);
    }
    return response.json();
}
