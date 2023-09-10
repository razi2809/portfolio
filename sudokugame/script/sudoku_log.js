function generateUniqueArray(length) {
  function shuffle(arr) {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function isValid(matrix, row, col, num) {
    // Check if num is not present in the current row, column, and 3x3 subgrid
    const subgridRow = Math.floor(row / 3) * 3;
    const subgridCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < length; i++) {
      if (
        matrix[row][i] === num ||
        matrix[i][col] === num ||
        matrix[subgridRow + Math.floor(i / 3)][subgridCol + (i % 3)] === num
      ) {
        return false;
      }
    }
    return true;
  }

  function solve(matrix, row, col) {
    if (row === length) {
      return true; // All rows filled, done
    }
    if (col === length) {
      return solve(matrix, row + 1, 0); // Move to the next row
    }

    // Shuffle numbers 1 to 9 for each column, ensuring randomness
    const shuffledNumbers = shuffle(Array.from({ length }, (_, i) => i + 1));

    for (const num of shuffledNumbers) {
      if (isValid(matrix, row, col, num)) {
        matrix[row][col] = num;

        if (solve(matrix, row, col + 1)) {
          return true; // If the next column is filled successfully
        }

        // Backtrack by resetting the cell
        matrix[row][col] = 0;
      }
    }

    // No valid number found for this position
    return false;
  }

  // Initialize a 2D array filled with zeros
  const matrix = Array.from({ length }, () => Array.from({ length }, () => 0));

  // Start filling the matrix
  solve(matrix, 0, 0);

  return matrix;
}

// Example usage:

export { generateUniqueArray };
