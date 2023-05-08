export const getToken = (): string | null => localStorage.getItem("token");
export const storeToken = (token : string): void => localStorage.setItem("token", token);
export const removeTokern = (): void => {localStorage.removeItem("token")};
