export const SAVE_TOKEN = 'SAVE_TOKEN';
export const DELELTE_TOKEN = 'SAVE_TOKEN';


export const saveToken = (Authtoken) => {
    console.log("Saved token in provide :-")
    console.log(Authtoken)
    return { type: SAVE_TOKEN, token: Authtoken }
}

export const deleteToken = () => {
    return { type: DELELTE_TOKEN, token: "no Auth" }
}
