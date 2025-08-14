import Cookies from "js-cookie";


let _accessToken: string | null = null;

export const setAccessToken = (t: string | null) => {
  _accessToken = t;
  if (t) {
    Cookies.set("token", t); 
  } else {
    Cookies.remove("token");
  }
};

export const getAccessToken = (): string | null => {
  return _accessToken ?? Cookies.get("token") ?? null;
};



