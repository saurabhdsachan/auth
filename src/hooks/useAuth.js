import Cookies from "js-cookie";
import * as React from "react";

export function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const adfsPath = () => {
    return "https://mws.test.gaiacloud.jpmchase.net";
  };
  return {
    authed,

    authenticate(callUserService) {
      try {
        if (
          (window && window.location && window.location.href) &
          ((window && window.location.href.includes("health")) ||
            window.location.href.includes("cypress"))
        ) {
          callUserService && setAuthed(false);
          return false;
        } else {
          fetch(adfsPath() + `/api/adfs/refresh`, {
            mode: "no-cors",
            credentials: "include",
          });
          return true;
        }
      } catch (error) {
        console.log("error calling adfs refresh", error);
        return false;
      }
    },
    login(data) {
      return new Promise((res, rej) => {
        if (data.username && data.password) {
          // make API call here
          setAuthed(true);
          Cookies.set("token", data.username, { expires: 7, secure: true });
          res();
        } else {
          Cookies.remove("token");
          rej();
        }
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        Cookies.remove("token");
        res();
      });
    },
  };
}
