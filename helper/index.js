export const isOneOfTheElementsExists = (str, arr) => {
  let isExists = false;
  for (let i = 0; i < arr.length; i++) {
    if (str.indexOf(arr[i]) === -1) {
      isExists = false;
    } else {
      isExists = true;
      break;
    }
  }

  return isExists;
};
