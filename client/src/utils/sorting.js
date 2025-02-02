export const sortByDate = (arr, order) => {
  return arr.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (order === 0) {
      return dateA - dateB; // For ascending order
    } else {
      return dateB - dateA; // For descending order
    }
  });
};

export const sortByAlphabet = (arr, order) => {
  return arr.sort((a, b) => {
    const strA = a.toLowerCase(); // Normalize case to avoid case sensitivity issues
    const strB = b.toLowerCase();

    if (order === 0) {
      return strA.localeCompare(strB); // For ascending order
    } else {
      return strB.localeCompare(strA); // For descending order
    }
  });
};
