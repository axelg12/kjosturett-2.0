import questions from '../../data/poll/questions.json';
import answers from '../../data/poll/answers.json';
import Kosningaprof from '../components/KosningaProf/KosningaProf';

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { upload, token } = searchParams;
  return <Kosningaprof questions={questions} isEmbedded={false} title="test" answers={answers} />;
}
