import { randomDateLast6Months } from 'src/db/seed/seed.utils';
import { QuestionModel } from 'src/question/model/question.model';

export const QUESTION_MODELS: QuestionModel[] = [
  {
    id: '07588369-3312-414e-8f01-5845082804d5',
    createdAt: randomDateLast6Months(),
    question: 'Was ist die Hauptstadt von Frankreich?',
    questionType: 'MULTIPLE_CHOICE',
    correctAnswer: 'Paris',
    answers: 'Paris;London;Berlin;Rom',
  },
  {
    id: 'd1a19fb2-7a89-429d-8b53-9b2b38f1fae1',
    createdAt: randomDateLast6Months(),
    question: 'Ist Wasser nass?',
    questionType: 'TRUE_FALSE',
    correctAnswer: String(true),
    answers: null,
  },
  {
    id: '8768de88-d260-4494-956a-27fa3f7e6131',
    createdAt: randomDateLast6Months(),
    question: '_ ist das größte Säugetier der Welt.',
    questionType: 'FILL_IN_THE_BLANK',
    correctAnswer: 'Blauwal',
    answers: null,
  },
  {
    id: '381acddf-3dc8-4311-9864-f1fe48909347',
    createdAt: randomDateLast6Months(),
    question: 'Ordne die Planeten nach ihrer Entfernung zur Sonne.',
    questionType: 'ORDERING',
    correctAnswer: 'Merkur;Venus;Erde;Mars',
    answers: 'Merkur;Venus;Erde;Mars',
  },
  {
    id: 'a112e4e9-69dc-4c0b-bd06-75f8f9fe08e1',
    createdAt: randomDateLast6Months(),
    question: 'Wie viele Einwohner hat Deutschland (ungefähr)?',
    questionType: 'ESTIMATE',
    correctAnswer: String(830000000),
    answers: null,
  },
  {
    id: '17f14efd-e040-427b-8414-83999f7cb475',
    createdAt: randomDateLast6Months(),
    question: 'Wieviel ist 7 mal 8?',
    questionType: 'NUMERIC',
    correctAnswer: String(56),
    answers: null,
  },
];
