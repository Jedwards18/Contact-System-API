export const capitalizeFirstLetter = (wordsToCapitalize: string) => {
  if (!wordsToCapitalize || wordsToCapitalize === '') return null;

  if (wordsToCapitalize.split(' ').length > 0) {
    const splitWords = wordsToCapitalize.split(' ');

    for (let i = 0; i < splitWords.length; i++) {
      splitWords[i] = splitWords[i][0].toUpperCase() + splitWords[i].substr(1);
    }

    return splitWords.join(' ');
  } else {
    return wordsToCapitalize[0] + wordsToCapitalize.substring(1);
  }
};
