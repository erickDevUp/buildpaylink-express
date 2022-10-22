import { withIronSession } from "next-iron-session";
import * as fs from 'fs'
const pass = Math.random().toString();

if (!process.env.PASS) {
  
  fs.writeFileSync('./.env.local','PASS='+pass);
  
}
export default  function withSession(handler) {

  return withIronSession(handler, {
    password: process.env.PASS+process.env.PASS || pass+pass,
    cookieName: "BuildPayLink",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
    },
  });
}
