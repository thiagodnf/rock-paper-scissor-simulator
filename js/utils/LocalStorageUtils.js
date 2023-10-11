class LocalStorageUtils {

    static PREFIX = "rps";

    static setItem(key, value) {
        localStorage.setItem(`${LocalStorageUtils.PREFIX}-${key}`, JSON.stringify(value));
    }

    static getItem(key) {
        return JSON.parse(localStorage.getItem(`${LocalStorageUtils.PREFIX}-${key}`));
    }

    static exists(key) {
        return LocalStorageUtils.getItem(key) !== null;
    }

    static getObject(key, defaultValue = {}) {

        if (!LocalStorageUtils.exists(key)) {
            LocalStorageUtils.setItem(key, defaultValue);
        }

        return LocalStorageUtils.getItem(key);
    }

    static getInteger(key, defaultValue = 0) {
        return parseInt(LocalStorageUtils.getObject(key, defaultValue));
    }
}
