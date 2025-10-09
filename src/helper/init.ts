const fs = require("fs-extra");


try{
    fs.ensureDir("test-results");
    fs.emptyDir("test-results");
}
catch (error) 
{
console.log("the folder failed to be built "+error)
}