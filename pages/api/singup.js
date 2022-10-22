import db from "lib/db";

import withSession from "../../lib/session";
import * as fs from 'fs'
import bcrypt from "bcryptjs";
import { flushSync } from "react-dom";

export default withSession(async (req, res) => {
  const { username, password } = req.body;
  const method = req.method.toLowerCase();
  console.log(req.body);

  if (method !== "post") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const query = await db();
  const result = await query.all("SELECT * FROM Acounnt");

  if (result.length == 0) {
    
  const pass = await encryptPass(password);

    await query.all(
      `INSERT INTO Acounnt (email,pass) values ("${username}","${pass}")`
    );

    try {
      await saveSession({ username }, req);
      res.status(200).json({ username });
      return;
    } catch (error) {
      console.log(error);
    }
  }

  res.status(403).json({ error: ERROR_CREDENTIALS });
});

const encryptPass = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

async function saveSession(user, request) {
  request.session.set("user", user);
  await request.session.save();
}
