import KosningaProfResults from '@/app/components/KosningaProf/KosningaProfResults';

import questionsBase from '../../../data/poll/questions.json';
import answers from '../../../data/poll/answers.json';
import partyReplies from '../../../data/build/parties.json';
import getResultsByScore from '@/utils/process-replies';
import { decodeAnswersToken } from '@/utils/utils';
import { Answer, AnswerMap } from '@/types/types';

const questionAnswer = (reply: string[] = []) => {
  return reply.reduce((all, answer, index) => {
    all[index + 1] = parseInt(answer, 10);
    return all;
  }, {} as Answer);
};

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { upload, token } = searchParams;

  const replies = decodeAnswersToken(params.slug);
  const myAnswers = questionAnswer(replies);
  const parties = getResultsByScore(replies, partyReplies).map((party) => {
    const partyWithReply = { ...party, reply: questionAnswer(party.reply.split('')) };
    return partyWithReply;
  });
  const questions = questionsBase.map(({ id, question }) => ({
    id,
    question,
    myAnswer: myAnswers[id],
  }));

  const socialPayload = parties
    .map((party) => `${party.letter}:${Math.ceil(party.score!)}`)
    .join('|');

  const ogImage = `https://lx62q4zmz2.execute-api.us-east-1.amazonaws.com/production/${encodeURIComponent(
    socialPayload
  )}`;
  return (
    <KosningaProfResults
      answers={answers as AnswerMap}
      questions={questions}
      renderSocialLinks={false}
      parties={parties}
      url={`https://kjosturett.is/kosningaprof/${encodeURIComponent(params.slug)}`}
      ogImage={ogImage}
    />
  );
}
