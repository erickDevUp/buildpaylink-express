import db from "lib/db";

const TestDB = async(req, res)=>{
 const query = await db();
 
const result = await query.all('SELECT * FROM Acounnt');
//await query.all('CREATE TABLE Acounnt (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT,pass TEXT);')
//await query.all('DROP TABLE Acounnt;')
console.log(result);
  res.status(200).json({ data: `/uploads/profiles` }); 
}
export default TestDB