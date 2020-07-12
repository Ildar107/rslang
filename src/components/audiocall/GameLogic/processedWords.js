/* eslint-disable no-console */
const wordsDetailUrl = 'https://dictionary.skyeng.ru/api/public/v1/words/search';
const alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
const partOfSpeech = [
  'n',
  'v',
  'j',
  'r',
  'prp',
  'prn',
  'crd',
  'cjc',
  'exc',
  'det',
  'abb',
  'x',
  'ord',
  'md',
  'ph',
  'phi',
];

let playWords = [];

const removeDuplicates = (arr, key) => [...new Map(arr.map((item) => [item[key], item])).values()];

const checkStages = (stages) => stages.filter((item) => item.length !== 5).length > 0;

const chunk = (array, size) => {
  const chunkedArr = [];
  const copied = [...array];
  const numOfChild = Math.ceil(copied.length / size);
  for (let i = 0; i < numOfChild; i += 1) {
    chunkedArr.push(copied.splice(0, size));
  }
  return chunkedArr;
};

const getRandom = (arr, n, oldItem) => {
  const result = [];
  if (arr.length) {
    for (let i = 0; i < n; i += 1) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!arr[idx]) {
        return result;
      }
      if (oldItem.id !== arr[idx].id) {
        result.push(arr[idx]);
      }
      arr.splice(idx, 1);
    }
  }
  return result;
};

const getUrlsCollection = (groupNumber = 0) => {
  const urls = [];
  for (let i = 0; i < 30; i += 1) {
    urls.push(`https://afternoon-falls-25894.herokuapp.com/words?group=${groupNumber}&page=${i}`);
  }
  return urls;
};

const sortAlphabetically = (arr) => arr.sort((a, b) => {
  const textA = a.wordTranslate.toUpperCase();
  const textB = b.wordTranslate.toUpperCase();
  if (textA < textB) {
    return -1;
  } if (textA > textB) {
    return 1;
  }
  return 0;
});

const regenerateStages = (stages, counter = 0) => {
  if (counter > 65) {
    return stages;
  }

  const clearStages = stages.filter((item) => item.length === 5);
  const badStages = stages.filter((item) => item.length !== 5);
  const copyPlayWords = JSON.parse(JSON.stringify(playWords));

  const regenStages = badStages.map((words) => {
    let stageWords = [...words];
    for (let i = 0; i < copyPlayWords.length; i += 1) {
      const similarWords = copyPlayWords[i].words;
      if (
        copyPlayWords[i].letter.toLowerCase() === words[0].wordTranslate[0].toLowerCase()
        && copyPlayWords[i].partOfSpeech === words[0].partOfSpeech
      ) {
        const randomWords = getRandom(similarWords, 5 - words.length, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = removeDuplicates(preStageWords, 'id');
        if (randomWords.length) return stageWords;
      }
      if (
        copyPlayWords[i].letter.toLowerCase() === words[0].wordTranslate[0].toLowerCase()
      ) {
        const randomWords = getRandom(similarWords, 5 - words.length, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = removeDuplicates(preStageWords, 'id');
        if (randomWords.length) return stageWords;
      }
      if (counter > 53) {
        if (
          copyPlayWords[i].partOfSpeech === words[0].partOfSpeech
        ) {
          const randomWords = getRandom(similarWords, 5 - words.length, stageWords[0]);
          const preStageWords = [...stageWords, ...randomWords];
          stageWords = removeDuplicates(preStageWords, 'id');
          if (randomWords.length) return stageWords;
        }
      }
    }

    return stageWords;
  });

  const newStages = [...clearStages, ...regenStages];

  if (checkStages(newStages)) {
    return regenerateStages(newStages, counter + 1);
  }
  return newStages;
};

const generateStages = (words) => {
  const copyPlayWords = JSON.parse(JSON.stringify(playWords));
  const stages = words.map((word) => {
    let stageWords = [word];
    for (let i = 0; i < copyPlayWords.length; i += 1) {
      const similarWords = copyPlayWords[i].words;
      if (
        copyPlayWords[i].letter.toLowerCase() === word.wordTranslate[0].toLowerCase()
        && copyPlayWords[i].partOfSpeech === word.partOfSpeech
      ) {
        const randomWords = getRandom(similarWords, 4, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = removeDuplicates(preStageWords, 'id');
        return stageWords;
      }
      if (
        copyPlayWords[i].letter.toLowerCase() === word.wordTranslate[0].toLowerCase()
      ) {
        const randomWords = getRandom(similarWords, 4, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = removeDuplicates(preStageWords, 'id');
        return stageWords;
      }
    }

    return stageWords;
  });

  if (checkStages(stages)) {
    return regenerateStages(stages);
  }
  return stages;
};

const generateRounds = (words) => {
  const stages = generateStages(words);
  return chunk(stages, 10);
};

const compareWordsDetails = (word, details) => {
  const wordDetails = details.find((item) => item.text === word.word) || details[0];
  word.partOfSpeech = wordDetails.meanings[0].partOfSpeechCode;
  return word;
};

const generatePlayWords = (words) => {
  const genPlayWords = [];
  alphabet.forEach((l) => {
    const sameLetterWords = words.filter((item) => item.wordTranslate[0].toLowerCase() === l);
    partOfSpeech.forEach((pS) => {
      const part = sameLetterWords.filter((item) => item.partOfSpeech === pS);
      if (part.length > 0) {
        genPlayWords.push({
          partOfSpeech: pS,
          letter: l,
          words: part,
        });
      }
    });
  });

  return genPlayWords;
};
const updateWordsDetails = (words, details) => {
  const newWords = words.map((word, i) => compareWordsDetails(word, details[i]));
  const newPlayWords = generatePlayWords(newWords);
  playWords = newPlayWords;
  generateRounds(newWords);
};

const getAllWordsDetail = (words) => {
  Promise.all(words.map((word) => fetch(`${wordsDetailUrl}?search=${word.word}&page=1&pageSize=5`).then((resp) => resp.json()))).then((data) => {
    updateWordsDetails(words, data);
  });
};

const getWordsCollection = async (groupNumber = 0) => {
  const urls = getUrlsCollection(groupNumber);
  Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then((data) => {
    const arrData = sortAlphabetically(data.flat(1));
    getAllWordsDetail(arrData);
  });
};

export {
  compareWordsDetails,
  updateWordsDetails,
  sortAlphabetically,
  checkStages,
  getWordsCollection,
  chunk,
  regenerateStages,
  removeDuplicates,
  generatePlayWords,
  getRandom,
  getAllWordsDetail,
  getUrlsCollection,
  generateStages,
  generateRounds,
};
