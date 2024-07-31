'use client';
import 'rc-slider/assets/index.css';
import React, { useState } from 'react';
import cx from 'classnames';
import Slider from 'rc-slider';
import s from './KosningaProf.module.scss';
import { encodeAnswersToken } from '@/utils/utils';

const answersKey = 'prof:answers';
const indexKey = 'prof:answers:index';

interface Question {
  id: number;
  question: string | null;
}

interface Answer {
  [key: string]: number | null;
}

const initialAnswers = (questions: Question[]) =>
  questions.reduce((all, { id }) => {
    // eslint-disable-next-line
    all[id] = null;
    return all;
  }, {} as Answer);

const marks = {
  1: 'Mjög ósammála',
  3: 'Hlutlaus',
  5: 'Mjög sammála',
};

interface Props {
  answers: {
    default: string;
    textMap: { [key: string]: string };
  };
  questions: Question[];
  isEmbedded: boolean;
  title: string;
}

const Kosningaprof = ({ questions, isEmbedded }: Props) => {
  const [answers, setAnswers] = useState<Answer>(initialAnswers(questions));
  const [token, setToken] = useState(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showReset, setShowReset] = useState(false);
  const [visible, setVisible] = useState({});
  // constructor(props) {

  //   this.positions = {};

  //   this.onReset = this.onReset.bind(this);
  //   this.onSend = this.onSend.bind(this);
  //   this.changeQuestion = this.changeQuestion.bind(this);
  // }
  // componentDidMount() {
  //   this.loadAnswers();
  // }
  const clearState = () => {
    localStorage.removeItem(answersKey);
    localStorage.removeItem(indexKey);
  };

  const onReset = () => {
    // eslint-disable-next-line
    if (window.confirm('Ertu viss um að þú byrja upp á nýtt?')) {
      const answers = initialAnswers(questions);
      clearState();
      setAnswers(answers);
      setShowReset(false);
    }
  };

  const onChange = (id: number) => (value: number | number[] | null) => {
    console.log('change!!', id, value);
    if (Array.isArray(value)) {
      value = value[0];
    }
    const newAnswers = {
      ...answers,
      [id]: value,
    };
    setAnswers(newAnswers);
    setStarted(true);
    saveState();
  };

  const onSend = async () => {
    const x = answers[2];
    const answerValues = Object.keys(answers)
      .map((x) => answers[x])
      .map((x) => (x == null ? '3' : x.toString()));
    const answersToken = encodeAnswersToken(answerValues);

    // this.context
    //   .fetch(`/konnun/replies/all?timestamp=${Date.now()}`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       reply: answersToken,
    //     }),
    //   })
    //   .catch(console.error);
    const segments = [isEmbedded && 'embed', 'kosningaprof', answersToken];
    const path = segments.filter(Boolean).join('/');
    // history.push(`/${path}`);
  };

  const saveState = () => {
    localStorage.setItem(answersKey, JSON.stringify(answers));
    localStorage.setItem(indexKey, currentQuestionIndex.toString());
  };

  const loadAnswers = () => {
    const localAnswer = localStorage.getItem(answersKey);
    if (localAnswer) {
      const answers = JSON.parse(localAnswer);
      const currentQuestionIndex = Number(localStorage.getItem(indexKey));
      setAnswers(answers);
      setCurrentQuestionIndex(currentQuestionIndex);
      setShowReset(true);
    }
  };

  const changeQuestion = (nextOrPrev: 1 | -1) => {
    setCurrentQuestionIndex(currentQuestionIndex + nextOrPrev);
  };

  const renderQuestion = (question: string | null, id: number) => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const hasAnswer = answers[id] !== null;
    const hasSomeAnswers = Object.values(answers).some((value) => value !== null);

    const skipQuestion = () => {
      onChange(id)(null);

      if (isEmbedded && !isLastQuestion) {
        changeQuestion(1);
      }
    };
    return (
      <div key={id} id={id.toString()} className={s.question}>
        <h3 className={s.questionText}>{question}</h3>
        <Slider
          dots
          min={1}
          max={5}
          value={answers[id] || 3}
          marks={marks}
          onChange={onChange(id)}
          dotStyle={{
            borderColor: '#e9e9e9',
            marginBottom: -5,
            width: 18,
            height: 18,
          }}
          handleStyle={{
            backgroundColor: '#333',
            borderColor: '#999',
            marginLeft: 4,
            marginTop: -7,
            width: 18,
            height: 18,
          }}
          trackStyle={{
            backgroundColor: 'transparent',
          }}
        />
        <div className={s.questionControls}>
          {!isEmbedded && hasAnswer && (
            <button className={s.skip} onClick={skipQuestion}>
              <i>Sleppa spurningu</i>
            </button>
          )}
          {isEmbedded && (
            <div className={s.questionEmbedControls}>
              {currentQuestionIndex >= 0 && (
                <button className={s.nextPrev} onClick={() => changeQuestion(-1)}>
                  Til baka
                </button>
              )}
              <button
                className={s.nextPrev}
                onClick={skipQuestion}
                style={{ backgroundColor: 'rgb(102, 109, 117)' }}
              >
                Sleppa spurningu
              </button>
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  className={s.nextPrev}
                  onClick={() => changeQuestion(1)}
                  style={{ backgroundColor: 'rgb(34,36,40)' }}
                  disabled={!hasAnswer}
                >
                  Áfram
                </button>
              )}
              {isLastQuestion && (
                <button
                  disabled={!hasSomeAnswers}
                  className={s.embedSubmit}
                  onClick={() => onSend()}
                >
                  Sjá niðurstöður
                </button>
              )}
            </div>
          )}
          {isLastQuestion && !hasSomeAnswers && (
            <p style={{ margin: '1rem 0' }}>
              Til að sjá niðurstöður verður þú að taka afstöðu með eða móti allavega einni
              fullyrðingu.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderAllQuestions = () => {
    const hasData = Object.values(answers).some((value) => value !== null);
    return (
      <div>
        {questions.map(({ question, id }) => renderQuestion(question, id))}
        {hasData && (
          <p style={{ textAlign: 'center' }}>
            <button onClick={onSend}>Reikna niðurstöður</button>
          </p>
        )}
      </div>
    );
  };

  const renderIntroText = () => {
    return (
      <div className={s.lead}>
        <p>
          Taktu <strong>afmælisprófið</strong> til þess að sjá hvaða systir þú ert og passar best
          við þínar skoðanir. Því fleiri spurningum sem þú svarar, því nákvæmari niðurstöður færðu.
        </p>
        {showReset && (
          <p>
            Þú getur tekið upp þráðinn frá því síðast og klárað prófið, eða{' '}
            <button className={s.reset} onClick={onReset}>
              byrjað
            </button>{' '}
            upp á nýtt.
          </p>
        )}
        {isEmbedded && <button onClick={() => changeQuestion(1)}>Áfram</button>}
      </div>
    );
  };

  // const { currentQuestionIndex } = this.state;

  // if (isEmbedded) {
  //   if (currentQuestionIndex === -1) {
  //     return <div className={cx(s.root, s.questions)}>{renderIntroText()}</div>;
  //   }

  //   const { question, id } = questions[currentQuestionIndex];

  //   return (
  //     <div className={cx(s.root, s.questions)}>
  //       <div className={s.progress}>
  //         <div
  //           className={s.progressBar}
  //           style={{
  //             transform: `translateX(${
  //               -100 * (1 - (currentQuestionIndex + 1) / questions.length)
  //             }%)`,
  //           }}
  //         />
  //       </div>
  //       <div
  //         ref={(element) => {
  //           this.questionsEl = element;
  //         }}
  //       >
  //         {renderQuestion(question, id)}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={cx(s.root, s.questions)}>
      {renderIntroText()}
      <div>{renderAllQuestions()}</div>
    </div>
  );
};

export default Kosningaprof;
