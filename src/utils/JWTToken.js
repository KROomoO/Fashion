export const setJWTToken = async (jwtToken) => {
    localStorage.setItem("jwt", JSON.stringify(jwtToken));
};

export const getJWTToken = () => {
    return JSON.parse(localStorage.getItem("jwt"));
};

export const checkJWTToken = () => {
    const jwtToken = JSON.parse(localStorage.getItem("jwt"));

    return new Promise((resolve, reject) => {
        if (!jwtToken) {
            reject(false);
        } else {
            resolve(true);
        }
    });
};

export const refreshJWTToken = (accessToken, refreshToken) => {
    const getData = JSON.parse(localStorage.getItem("jwt"));

    getData.accessToken = accessToken.slice(7);
    getData.refreshToken = refreshToken.slice(7);

    localStorage.setItem("jwt", JSON.stringify(getData));
};
