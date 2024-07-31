export const getAssetUrl = (...assets: string[]) => {
  return `/${assets.join('/')}.jpg`;
};

export const encodeAnswersToken = (answers: string[]) => {
  const chunkLength = Math.floor(answers.length / 3);

  const first = parseInt(answers.slice(0, chunkLength).join(''), 10).toString(36);
  const second = parseInt(answers.slice(chunkLength, chunkLength * 2).join(''), 10).toString(36);
  const third = parseInt(answers.slice(chunkLength * 2, answers.length).join(''), 10).toString(36);

  return `${first}:${second}:${third}`;
};
