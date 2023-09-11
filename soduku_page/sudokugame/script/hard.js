const isAllArrayFilled = (array, hardClicked) => {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (!array[i][j]) {
          return false; // If any element is empty, return false
        }
      }
    }
    if (hardClicked) {
      return true;
    }
    return false;
  }
};
export { isAllArrayFilled };
