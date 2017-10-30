export function saveToLocal(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value))
};

export function loadFromLocal(name) {
    let localStorageName = window.localStorage.getItem(name)
    try {
        if (localStorageName) {
            return JSON.parse(localStorageName)
        } else {
            return ''
        }
    } catch (e) {
        return ''
    }
};

export function removeFromLocal(name) {
    window.localStorage.removeItem(name)
}