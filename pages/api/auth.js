import { databaseServiceFactory } from "../../services/databaseService";
import { authServiceFactory } from "../../services/authService";
import withSession from "../../lib/session";
import db from "lib/db";

const dbService = databaseServiceFactory();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
    console.log(req.body);
  
  const ERROR_CREDENTIALS = "Invalid username and/or password";

  const method = req.method.toLowerCase();
  const { username, password } = req.body;

  if (method !== "post") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const query = await db();
  const user = await query.all(
    "SELECT pass FROM Acounnt WHERE email=" + `'${username}'`
  );

  try {
    if (await authService.validate(password, user[0].pass) === true) {
    
      await saveSession({ username }, req);
      res.status(200).json({ username });
      return;
    }
  } catch (error) {
    console.log(error);
  }
  res.status(403).json({ error: ERROR_CREDENTIALS });
});

async function saveSession(user, request) {
  request.session.set("user", user);
  await request.session.save();
}
