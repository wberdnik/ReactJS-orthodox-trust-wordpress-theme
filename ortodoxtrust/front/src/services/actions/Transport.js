const testError = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
}

export default function m_axios(is, url, action) { //items of aggregate
    fetch(url)
        .then(testError)
        .then(response => response.json())
        .then(action)
        .catch(function (err) {
            console.log('Fetch Error ' + is + ' :-S', err);
        })
}
