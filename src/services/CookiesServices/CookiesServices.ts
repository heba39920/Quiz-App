// src/services/CookiesServices.ts
import Cookies from 'js-cookie';

const CookieService = {
  set: (key: string, value: string, days = 7) => {
    Cookies.set(key, value, { expires: days });
  },

  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  remove: (key: string) => {
    Cookies.remove(key);
  },
};

export default CookieService;
