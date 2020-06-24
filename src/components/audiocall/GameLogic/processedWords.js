const wordsDetailUrl = 'https://dictionary.skyeng.ru/api/public/v1/words/search';
const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];
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
  const textA = a.word.toUpperCase();
  const textB = b.word.toUpperCase();
  if (textA < textB) {
    return -1;
  } if (textA > textB) {
    return 1;
  }
  return 0;
});

const getAllWordsDetail = (words) => {
  Promise.all(words.map((word) => fetch(`${wordsDetailUrl}?search=${word.word}&page=1&pageSize=5`).then((resp) => resp.json()))).then((data) => {
    this.updateWordsDetails(words, data);
  });
};

const updateWordsDetails = (words, details) => {
  const newWords = words.map((word, i) => this.compareWordsDetails(word, details[i]));
  const newPlayWords = this.generatePlayWords(newWords);
  this.setState({ playWords: newPlayWords });
  this.generateRounds(newWords);
};

const compareWordsDetails = (word, details) => {
  const wordDetails = details.find((item) => item.text === word.word) || details[0];
  word.partOfSpeech = wordDetails.meanings[0].partOfSpeechCode;
  return word;
};

const generatePlayWords = (words) => {
  const playWords = [];
  alphabet.forEach((l) => {
    const sameLetterWords = words.filter((item) => item.word[0].toLowerCase() === l);
    partOfSpeech.forEach((pS) => {
      const part = sameLetterWords.filter((item) => item.partOfSpeech === pS);
      if (part.length > 0) {
        playWords.push({
          partOfSpeech: pS,
          letter: l,
          words: part,
        });
      }
    });
  });

  return playWords;
};

const generateRounds = (words) => {
  const stages = this.generateStages(words);
  return chunk(stages, 10);
  // console.log(stages);
  // console.log(JSON.stringify(stages));
};

const generateStages = (words) => {
  const copyPlayWords = JSON.parse(JSON.stringify(this.state.playWords));
  const stages = words.map((word) => {
    let stageWords = [word];
    for (let i = 0; i < copyPlayWords.length; i += 1) {
      const similarWords = copyPlayWords[i].words;
      if (
        copyPlayWords[i].letter.toLowerCase() === word.word[0].toLowerCase()
        && copyPlayWords[i].partOfSpeech === word.partOfSpeech
      ) {
        const randomWords = this.getRandom(similarWords, 4, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = this.removeDuplicates(preStageWords, 'id');
        return stageWords;
      }
      if (
        copyPlayWords[i].letter.toLowerCase() === word.word[0].toLowerCase()
      ) {
        const randomWords = this.getRandom(similarWords, 4, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = this.removeDuplicates(preStageWords, 'id');
        return stageWords;
      }
    }

    return stageWords;
  });

  if (this.checkStages(stages)) {
    return this.regenerateStages(stages);
  }
  return stages;
};

const regenerateStages = (stages, counter = 0) => {
  if (counter > 60) {
    return stages;
  }

  const clearStages = stages.filter((item) => item.length === 5);
  const badStages = stages.filter((item) => item.length !== 5);
  const copyPlayWords = JSON.parse(JSON.stringify(this.state.playWords));

  const regenStages = badStages.map((words) => {
    let stageWords = [...words];
    for (let i = 0; i < copyPlayWords.length; i += 1) {
      const similarWords = copyPlayWords[i].words;
      if (
        copyPlayWords[i].letter.toLowerCase() === words[0].word[0].toLowerCase()
        && copyPlayWords[i].partOfSpeech === words[0].partOfSpeech
      ) {
        const randomWords = this.getRandom(similarWords, 5 - words.length, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = this.removeDuplicates(preStageWords, 'id');
        if (randomWords.length) return stageWords;
      }
      if (
        copyPlayWords[i].letter.toLowerCase() === words[0].word[0].toLowerCase()
      ) {
        const randomWords = this.getRandom(similarWords, 5 - words.length, stageWords[0]);
        const preStageWords = [...stageWords, ...randomWords];
        stageWords = this.removeDuplicates(preStageWords, 'id');
        if (randomWords.length) return stageWords;
      }
      if (counter > 53) {
        if (
          copyPlayWords[i].partOfSpeech === words[0].partOfSpeech
        ) {
          const randomWords = this.getRandom(similarWords, 5 - words.length, stageWords[0]);
          const preStageWords = [...stageWords, ...randomWords];
          stageWords = this.removeDuplicates(preStageWords, 'id');
          if (randomWords.length) return stageWords;
        }
      }
    }

    return stageWords;
  });

  const newStages = [...clearStages, ...regenStages];

  if (this.checkStages(newStages)) {
    return this.regenerateStages(newStages, counter + 1);
  }
  return newStages;
};

const getWordsCollection = async (groupNumber = 0) => {
  const urls = this.getUrlsCollection(groupNumber);
  Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then((data) => {
    const arrData = this.sortAlphabetically(data.flat(1));
    this.getAllWordsDetail(arrData);
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
