# code-cleanliness-analyzer

```
`npm i`

`node src/cli.js sample-code\example.js`
```

### ** Algorithm for Code Cleanliness Calculation**

#### **1\. Metrics Collection**

Gather the following metrics from the code:

1.  **Cyclomatic Complexity (CC)**

    -   Measures the number of decision points (`if`, `else`, loops) in a function or script.
    -   High CC indicates harder-to-maintain code.
2.  **Lines of Code (LOC)**

    -   Separate into categories:
        -   **Code LOC**: Lines with executable statements.
        -   **Comment LOC**: Lines containing comments.
        -   **Empty LOC**: Blank lines.
    -   Useful for calculating comments-to-code ratio.
3.  **Comments-to-Code Ratio**

    -   Formula: Comments-to-Code Ratio=Comment LOCCode LOC\text{Comments-to-Code Ratio} = \frac{\text{Comment LOC}}{\text{Code LOC}}Comments-to-Code Ratio=Code LOCComment LOC​
    -   Target range: 10--25%. Too few comments reduce readability; too many may indicate over-explained or redundant code.
4.  **Unused Code Detection**

    -   Look for unused variables, imports, or functions.
5.  **Adherence to Naming Conventions**

    -   Check if variables, functions, and files follow consistent naming conventions (e.g., camelCase, PascalCase).
6.  **Code Duplication**

    -   Identify duplicate code blocks or functions. Duplicate code increases maintenance effort.
7.  **Linting Errors**

    -   Use tools like ESLint to identify violations of best practices or coding standards.

* * * * *

#### **2\. Weighting and Scoring**

Assign a score to each metric based on its impact on cleanliness:

-   Normalize all metrics to a scale (e.g., 0--10).
-   Assign weights to each metric based on importance (e.g., Cyclomatic Complexity might have a weight of 0.3, while Comments-to-Code Ratio has 0.2).

Example:

Cleanliness Score=(0.3×CCscore)+(0.2×Comment Ratioscore)+...\text{Cleanliness Score} = (0.3 \times CC_{\text{score}}) + (0.2 \times \text{Comment Ratio}_{\text{score}}) + \dotsCleanliness Score=(0.3×CCscore​)+(0.2×Comment Ratioscore​)+...

* * * * *

#### **3\. Normalize Metrics**

Convert raw metrics into normalized scores:

-   **Cyclomatic Complexity**:\
    Normalize CC values:

    -   CC ≤ 5: Score 10 (Good).
    -   CC > 20: Score 0 (Poor).
-   **Comments-to-Code Ratio**:

    -   Within 10--25%: Score 10.
    -   Below 5% or above 40%: Score 0.
-   **Linting Errors**:

    -   Fewer than 5 errors: Score 10.
    -   More than 20 errors: Score 0.

* * * * *

#### **4\. Final Score Calculation**

Sum the weighted scores to calculate the cleanliness score:

-   A score between **0 and 100**.
-   Higher scores indicate cleaner, more maintainable code.




