const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        authorization: 'e76e500f-0f0f-49cd-b53c-9c974ab7e15e',
        'Content-Type': 'application/json'
    }
};

function handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options = {}) {
    return fetch(`${config.baseUrl}${endpoint}`, {
        headers: config.headers,
        ...options
    }).then(handleResponse);
}

export function getUserProfile() {
    return request('/users/me');
}

export function updateUserProfile(name, about) {
    return request('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({ name, about })
    });
}

export function getCards() {
    return request('/cards');
}

export function addCard(name, link) {
    return request('/cards', {
        method: 'POST',
        body: JSON.stringify({ name, link })
    });
}

export function deleteCardFromServer(cardId) {
    return request(`/cards/${cardId}`, {
        method: 'DELETE'
    });
}

export function addLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT'
    });
}

export function removeLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE'
    });
}

export function updateAvatar(avatarUrl) {
    return request('/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({ avatar: avatarUrl })
    });
}
