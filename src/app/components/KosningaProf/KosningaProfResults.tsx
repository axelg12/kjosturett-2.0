'use client';

import React, { useState } from 'react';
import cx from 'classnames';
import s from './KosningaProfResult.module.scss';
import Link from 'next/link';
import { getAssetUrl } from '@/utils/utils';
import Image from 'next/image';
import { AnswerMap, PartyReplyWithScore, PartyReplyWithScoreSplit } from '@/types/types';
import { CCollapse } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const scoreToFloatingPoint = (score: number, scalar = 1) =>
  Math.max(1, Math.ceil(score / scalar)) / 100;

const pluralize = (count: number, singular: string, plural: string, zero = '') => {
  if (count === 0 && zero) {
    return zero;
  }
  return count > 1 ? plural : singular;
};

interface QuestionAnswer {
  question: string;
  id: number;
  myAnswer: number;
}

interface Props {
  questions: QuestionAnswer[];
  answers: AnswerMap;
  parties: PartyReplyWithScoreSplit[];
  ogImage: string;
  url: string;
  renderSocialLinks: boolean;
}

const KosningaprofResults = ({
  questions,
  answers,
  parties,
  ogImage,
  url,
  renderSocialLinks,
}: Props) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const toggle = (party: string) => {
    setOpen({
      ...open,
      [party]: !open[party],
    });
  };

  const renderLink = (href: string, title: string, extraProps?: { [key: string]: string }) => {
    return (
      <Link href={href} {...extraProps}>
        {title}
      </Link>
    );
  };

  const renderIntro = () => {
    return (
      <div>
        <p className={s.lead}>
          Niðurstöður úr kosningaprófi <strong>Kjóstu rétt</strong>.
          {/* Þú getur lesið{' '}
          {renderLink('/malefni/atvinnumal', 'stefnumál flokkana')} í þeim málefnum sem þér þykir
          mikilvæg. */}
        </p>

        <p className={s.buttons}>
          {renderLink('/kosningaprof', 'Taka kosningaprófið', {
            className: s.takeTest,
          })}
        </p>
        {renderSocialLinks && (
          <p className={s.buttons}>
            <Link
              className={s.shareButton}
              style={{ background: '#4760a5' }}
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
            >
              Deila niðurstöðum á Facebook
            </Link>
            <Link
              className={s.shareButton}
              style={{ background: '#1da0f2', marginLeft: '15px' }}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                'Mínar niðurstöður úr kosningaprófi Kjóstu rétt: '
              )}&url=${encodeURIComponent(url)}&hashtags=kosningar`}
              target="_blank"
            >
              Deila niðurstöðum á Twitter
            </Link>
          </p>
        )}
      </div>
    );
  };

  const answeredQuestions = questions.filter(({ myAnswer }) => myAnswer && myAnswer !== 6);

  const partyScoreScalar = parties.length ? parties[0].score / 100 : 1;

  return (
    <div className={s.root}>
      {renderIntro()}

      <h3 className={s.partiesHeader}>Stjórnmálaflokkar</h3>
      <p className={s.nonLead}>
        Flokkunum er raðað eftir afstöðu þeirra í kosningaprófinu samanborið við þín svör.{' '}
        <strong>Smelltu á stjórnmálaflokk</strong> til þess að skoða samanburð einstakra spurninga.{' '}
      </p>

      {answeredQuestions.length / questions.length < 0.5 && (
        <p className={s.nonLead}>
          Einungis {answeredQuestions.length}{' '}
          {pluralize(answeredQuestions.length, 'spurningu', 'spurningum')} var svarað og því gætu
          niðurstöðurnar ekki veitt fullkomna mynd. Því fleiri spurningum sem þú svarar, því
          nákvæmari niðurstöður færðu.
        </p>
      )}

      {parties
        .filter((party) => party.score)
        .map((party) => (
          <div key={party.letter}>
            <div
              className={s.party}
              key={party.url}
              role="button"
              onClick={() => toggle(party.letter)}
            >
              <div
                className={s.partyProgress}
                style={{
                  transform: `scaleX(${scoreToFloatingPoint(party.score, partyScoreScalar)})`,
                }}
              />
              <Image
                layout="fill"
                alt=""
                src={getAssetUrl('party-icons', party.url)}
                className={s.partyLogo}
              />
              <div className={s.partyName}>{party.name}</div>
              <div className={s.partyPercentage}>{Math.ceil(party.score)}%</div>
            </div>
            <CCollapse visible={open[party.letter] === true}>
              <div className={s.partyQuestions}>
                {answeredQuestions
                  .map((question) => ({
                    ...question,
                    myAnswer: question.myAnswer || 3,
                    partyAnswer: party.reply[question.id],
                  }))
                  .sort((a, b) => {
                    const aAgree = Math.abs(a.myAnswer - a.partyAnswer);
                    const bAgree = Math.abs(b.myAnswer - b.partyAnswer);
                    if (a.myAnswer === 3 || a.myAnswer === 6) {
                      return 1;
                    }
                    if (b.myAnswer === 3 || b.myAnswer === 6 || isNaN(aAgree) || isNaN(bAgree)) {
                      return -1;
                    }
                    return aAgree - bAgree;
                  })
                  .map(({ id, myAnswer, question, partyAnswer }) => {
                    const iAmIndiffrent = !(myAnswer !== 3 && myAnswer !== 6);
                    const pluralParty = party.name === 'Píratar';
                    const partyIndiffrent = !(partyAnswer !== 3 && partyAnswer !== 6);
                    const difference = Math.abs(myAnswer - partyAnswer);

                    return (
                      <div className={s.partyQuestion} key={id}>
                        <h4>
                          <i className={cx(s.dot, !iAmIndiffrent && s[`dot${difference}`])} />
                          {question}
                        </h4>

                        {difference === 0 ? (
                          <div>
                            Bæði ég og {party.name} erum{' '}
                            <strong>{answers.textMap[myAnswer].toLowerCase()}</strong>{' '}
                            {iAmIndiffrent && 'gagnvart '} þessari staðhæfingu.
                          </div>
                        ) : (
                          <div>
                            Ég er{' '}
                            <strong>
                              {(answers.textMap[myAnswer] || 'hlutlaus').toLowerCase()}
                            </strong>{' '}
                            en {party.name} {pluralParty ? 'eru ' : 'er '}
                            <strong>
                              {(answers.textMap[partyAnswer] || 'hlutlaus').toLowerCase()}
                              {(partyIndiffrent && pluralParty && 'ir ') || ' '}
                            </strong>{' '}
                            {partyIndiffrent && 'gagnvart '} þessari staðhæfingu.
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </CCollapse>
          </div>
        ))}
    </div>
  );
};

export default KosningaprofResults;
