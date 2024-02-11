import { Authenticator } from "./Authentication";
import { Navigation } from "./Navigation";

export const Secure = {
  ...Authenticator,
  ...Navigation,
};
