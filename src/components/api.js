const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        authorization: 'e76e500f-0f0f-49cd-b53c-9c974ab7e15e',
        'Content-Type': 'application/json'
    }
};

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserProfile() {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
        .then(handleResponse);
}

export function updateUserProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    }).then(handleResponse);
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
        .then(handleResponse);
}

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    }).then(handleResponse);
}

export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(handleResponse);
}

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse);
};

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse);
};

export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    })
    .then(handleResponse);
}
