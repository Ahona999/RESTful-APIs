CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

try {
    connection.query(q, [data], (err,result)=>{
          if (err) throw err;
          console.log(result);
      });
    } catch (err) {
          console.log(err);
    };
    
    connection.end();