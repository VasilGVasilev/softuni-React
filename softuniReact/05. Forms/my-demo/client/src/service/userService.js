const baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const response = await fetch(`${baseUrl}`);
    const data = await response.json();

    return data.users;
}

export const getOne = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const data = await response.json();

    return data.user;
}

export const create = async (userData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        const result = await response.json();

        return result.user;
    } else {
        throw { message: 'Unable to create user' };
    }
}

export const edit = async (userId, userData) => {
    const response = await fetch(`${baseUrl}/${userId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    return result.user;
}