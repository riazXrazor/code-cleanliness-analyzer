const fs = require("fs");
const esprima = require("esprima");
const { ESLint } = require("eslint");

async function calculateCleanliness(filePath) {
  try {
    // Step 1: Read and Parse Code
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = esprima.parseScript(code, { loc: true, comment: true });

    // Step 2: Collect Metrics
    const cyclomaticComplexity = calculateCyclomaticComplexity(ast);
    const commentsRatio = calculateCommentsRatio(ast, code);
    const lintErrors = await countLintErrors(filePath);
    const duplication = detectCodeDuplication(ast);

    // Step 3: Normalize Scores
    const scores = {
      cyclomaticComplexity: normalizeCyclomaticComplexity(cyclomaticComplexity),
      commentsRatio: normalizeCommentsRatio(commentsRatio),
      lintErrors: normalizeLintErrors(lintErrors),
      duplication: normalizeDuplication(duplication),
    };

    // Step 4: Weighted Score Calculation
    const weights = { cc: 0.3, comments: 0.2, lint: 0.3, duplication: 0.2 };
    const finalScore =
      weights.cc * scores.cyclomaticComplexity +
      weights.comments * scores.commentsRatio +
      weights.lint * scores.lintErrors +
      weights.duplication * scores.duplication;

    // Step 5: Report
    console.log("Metrics:", {
      cyclomaticComplexity,
      commentsRatio,
      lintErrors,
      duplication,
    });
    console.log("Scores:", scores);
    console.log("Cleanliness Score:", finalScore.toFixed(2));

    return finalScore.toFixed(2);
  } catch (error) {
    console.error("Error calculating cleanliness:", error.message);
  }
}

// Helper Functions
function calculateCyclomaticComplexity(ast) {
  let complexity = 1; // Base flow
  walkAST(ast, (node) => {
    if (
      ["IfStatement", "ForStatement", "WhileStatement", "SwitchCase"].includes(
        node.type
      )
    ) {
      complexity++;
    }
  });
  return complexity;
}

function calculateCommentsRatio(ast, code) {
  const totalLines = code.split("\n").length;
  const commentLines = ast.comments.length;
  const codeLines = totalLines - commentLines;
  return (commentLines / codeLines) * 100;
}

async function countLintErrors(filePath) {
  const eslint = new ESLint();
  const results = await eslint.lintFiles([filePath]);
  return results[0].messages.length;
}

function detectCodeDuplication(ast) {
  const nodeHashes = new Set();
  let duplicationCount = 0;

  walkAST(ast, (node) => {
    const hash = JSON.stringify(node);
    if (nodeHashes.has(hash)) {
      duplicationCount++;
    } else {
      nodeHashes.add(hash);
    }
  });

  return duplicationCount;
}

// Normalization Functions (0-10 scale)
function normalizeCyclomaticComplexity(value) {
  if (value <= 5) return 10;
  if (value >= 20) return 0;
  return Math.max(0, 10 - (value - 5));
}

function normalizeCommentsRatio(value) {
  if (value >= 10 && value <= 25) return 10;
  return Math.max(0, 10 - Math.abs(value - 15));
}

function normalizeLintErrors(value) {
  return Math.max(0, 10 - value * 0.5); // Deduct 0.5 points per lint error
}

function normalizeDuplication(value) {
  return Math.max(0, 10 - value * 2); // Deduct 2 points per duplication
}

// Utility Function to Traverse AST
function walkAST(ast, callback) {
  if (Array.isArray(ast)) {
    ast.forEach((node) => walkAST(node, callback));
  } else if (ast && typeof ast === "object") {
    callback(ast);
    Object.keys(ast).forEach((key) => walkAST(ast[key], callback));
  }
}

// Example Usage
// (async () => {
//   const score = await calculateCleanliness("./sample-code/example.js");
//   console.log("Final Cleanliness Score:", score);
// })();

module.exports.calculateCleanliness = calculateCleanliness;
