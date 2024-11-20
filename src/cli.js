const { program } = require("commander");

const { calculateCleanliness } = require("./index");
// console.log(calculateCleanliness);
program
  .version("1.0.0")
  .description("Analyze code cleanliness")
  .argument("<file>", "File to analyze")
  .action((file) => {
    // Call your analyze function here
    calculateCleanliness(file);
  });

program.parse(process.argv);
