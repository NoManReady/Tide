export function saveToSession(name, value) {
    window.sessionStorage.setItem(name, JSON.stringify(value))
};

export function loadFromSession(name) {
    let sessionStorageName = window.sessionStorage.getItem(name)
    try {
        if (sessionStorageName) {
            return JSON.parse(sessionStorageName)
        } else {
            return ''
        }
    } catch (e) {
        return ''
    }
};

export function removeFromSession(name) {
    window.sessionStorage.removeItem(name)
}