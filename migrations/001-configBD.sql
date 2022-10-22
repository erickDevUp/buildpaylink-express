--up
CREATE TABLE Acounnt {
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT;
    pass TEXT;
};

INSERT INTO Acounnt (email,pass) values ('email@gmail.com','1234556az');
--down
DROP TABLE Acounnt;