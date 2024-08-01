export interface Party {
  url: string;
  name: string;
  leader: string;
  leaderTitle: string;
}

export interface Category {
  name: string;
  category: string;
  statement?: string;
}

export interface Answer {
  [key: string]: number;
}

interface PartyReplyBase {
  letter: string;
  url: string;
  name: string;
  nameDeflected: string;
  website: string;
  leader: string;
  leaderTitle: string;
  color: string;
}

export interface PartyReply extends PartyReplyBase {
  reply: string;
}
export interface PartyReplyWithScore extends PartyReplyBase {
  score: number;
  // reply: { [key: string]: number };
  reply: string;
}

export interface PartyReplyWithScoreSplit extends PartyReplyBase {
  score: number;
  reply: { [key: string]: number };
}

export interface AnswerMap {
  default: string;
  textMap: { [key: number]: string };
}
