// Adapted from @borgar's gist: https://gist.github.com/borgar/5b59dc2d70d1a93bdce5e4fb15ec7d71#file-matchranking-js

import { PartyReply, PartyReplyWithScore } from '@/types/types';

const valueMap: { [key: string]: number | null } = {
  '1': -1,
  '2': -0.8,
  '3': 0,
  '4': 0.8,
  '5': 1,
  '6': null,
};

const mapToValues = (answers: string[]): Array<number | null> => {
  return answers.map((value) => valueMap[value]);
};

export const match = (answers: Array<number | null>, matchersAnswers: Array<number | null>) => {
  if (!matchersAnswers) {
    return 0;
  }

  let ranks = 0;
  let distance = 0;

  answers.forEach((my, i) => {
    const them = matchersAnswers[i];

    if (my != null && them != null) {
      distance += Math.abs(my - them);
      ranks += 1;
    }
  });

  return ((2 - distance / ranks) / 2) * 100;
};

const sortByRating = (a: PartyReplyWithScore, b: PartyReplyWithScore) => b.score - a.score;

export default function getResultsByScore(
  answers: string[],
  dataset: PartyReply[]
): PartyReplyWithScore[] {
  const answerValues = mapToValues(answers);
  return dataset
    .map((data) => ({
      ...data,
      score: match(answerValues, mapToValues(data.reply.split(''))),
    }))
    .sort(sortByRating);
}
