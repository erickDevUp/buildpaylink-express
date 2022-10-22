import db from "../lib/db";

const databaseServiceFactory = () => {

  const getUser = async (username) => {
    const query = await db();
    const user = await query.all(
      "SELECT pass FROM Acounnt WHERE email=" + `'${username}'`
    );
    if (user.length === 0) {
      throw new Error("User not found");
    }
    return user[1];
  };

  return { getUser };
};

module.exports = {
  databaseServiceFactory,
};
