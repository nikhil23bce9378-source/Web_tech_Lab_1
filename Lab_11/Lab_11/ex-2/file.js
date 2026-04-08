const fs = require("fs");

// 1. Create / Write file
fs.writeFile("test.txt", "Hello Node.js", (err) => {
  if (err) throw err;
  console.log("File created and data written");

  // 2. Append data
  fs.appendFile("test.txt", "\nAppended text", (err) => {
    if (err) throw err;
    console.log("Data appended");

    // 3. Read file
    fs.readFile("test.txt", "utf8", (err, data) => {
      if (err) throw err;
      console.log("File content:");
      console.log(data);

      // 4. Delete file
      fs.unlink("test.txt", (err) => {
        if (err) throw err;
        console.log("File deleted");
      });
    });
  });
});