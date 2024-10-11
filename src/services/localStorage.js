
export const LocalKeys = {
    REFRESH_TOKEN: "refresh_token",
    ACCESS_TOKEN : "access_token",
};

export const SetLocalAsString = (key, data) => {
    localStorage.setItem(key, data);
}

export const GetLocalAsString = (key) => {
    const data = localStorage.getItem(key);
    return data;
}

export const RemoveLocal = (key) => {
    localStorage.removeItem(key);
}
