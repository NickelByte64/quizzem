import type { Request, Response } from 'express';
import type { UUID } from 'node:crypto';

type QuestionModel = {
  id: UUID;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

const QUESTIONS: QuestionModel[] = [
  {
    id: '1bc398e0-df1c-47f3-a8ab-4947d4362726',
    question: 'What is the name of the playable character in the 2018 video game Deltarune: Chapter 1?',
    correctAnswer: 'Kris',
    incorrectAnswers: ['Frisk', 'Chara', 'Gaster'],
  },
  {
    id: '592255ac-b221-45b4-8084-06a394ae2748',
    question: 'What was the name of the hip hop group Kanye West was a member of in the late 90s?',
    correctAnswer: 'The Go-Getters',
    incorrectAnswers: ['The Jumpers', 'The Kickstarters', 'The Beat-Busters'],
  },
  {
    id: '4d784612-0f92-414e-9b7c-45cecb42353f',
    question: 'When was Final Fantasy XV released?',
    correctAnswer: 'November 29th, 2016',
    incorrectAnswers: ['October 25th, 2016', 'December 31th, 2016', 'November 30th, 2016'],
  },
  {
    id: 'd1f2c7a6-353f-446a-a404-e5868b998e2e',
    question: 'Which NFL team plays for New England?',
    correctAnswer: 'Patriots',
    incorrectAnswers: ['Chiefs', 'Dolphins', '49ers'],
  },
  {
    id: '541f44ef-8c71-4e0c-9989-9130cc481062',
    question: 'Who is depicted on the US hundred dollar bill?',
    correctAnswer: 'Benjamin Franklin',
    incorrectAnswers: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson'],
  },
  {
    id: '62a9ebda-6ecc-4c4e-87a4-6e28e498fc7e',
    question: 'What is Hypernatremia?',
    correctAnswer: 'Increase in blood sodium',
    incorrectAnswers: ['Decrease in blood potassium', 'Increase in blood glucose', 'Decrease in blood iron'],
  },
  {
    id: 'aa0d6b00-a2aa-4284-a85a-6ab896a4fc45',
    question: 'When did the French Revolution begin?',
    correctAnswer: '1789',
    incorrectAnswers: ['1823', '1756', '1799'],
  },
  {
    id: 'd20fe55f-8a37-404e-8118-a6698d53b3bd',
    question: 'Satella in "Re:Zero" is the witch of what?',
    correctAnswer: 'Envy',
    incorrectAnswers: ['Pride', 'Sloth', 'Wrath'],
  },
  {
    id: '7ebac8ba-2306-4825-860d-ceaf440426d0',
    question: `Which of these landmarks is not included in the original 'Seven Wonders of the Ancient World'?`,
    correctAnswer: 'Great Wall of China',
    incorrectAnswers: ['Great Pyramid of Giza', 'Colossus of Rhodes', 'Hanging Gardens of Babylon'],
  },
  {
    id: '9871a540-4344-4e17-8836-3ab45a85c622',
    question: 'Mark Wahlberg played the titular character of which 2008 video-game adaptation?',
    correctAnswer: 'Max Payne',
    incorrectAnswers: ['Alan Wake', 'Hitman', 'God Of War'],
  },
  {
    id: 'b65d6821-8e74-4d89-938f-02d5c5699363',
    question: 'What does a milliner make and sell?',
    correctAnswer: 'Hats',
    incorrectAnswers: ['Shoes', 'Belts', 'Shirts'],
  },
  {
    id: '26f05fc3-0805-4d4d-8db5-3e819847d7d4',
    question: 'Who is revealed to be the villain at the end of the first live action Scooby Doo movie?',
    correctAnswer: 'Scrappy Doo',
    incorrectAnswers: ['Old Man Mason', 'The Local News Team', 'Fred'],
  },
  {
    id: '9ca03471-cc19-4408-86c2-69d7f6911efb',
    question: 'What otherworldly land does Thor come from?',
    correctAnswer: 'Asgard',
    incorrectAnswers: ['Midgard', 'Jotunheim', 'Sovengarde'],
  },
  {
    id: 'a66bd491-9f4c-4abf-9cb2-cab25bcae1eb',
    question: `The "Trail of Tears" was a result of which United States President&'s Indian Removal Policy?`,
    correctAnswer: 'Andrew Jackson',
    incorrectAnswers: ['Harry S. Truman', 'Martin Van Buren', 'John Quincy Adams'],
  },
  {
    id: '448712ea-5fa9-49a5-8b59-a9852f8b4072',
    question: 'In "Call Of Duty: Zombies", what does the game traditionally reward you for completing a boss round?',
    correctAnswer: 'Max Ammo',
    incorrectAnswers: ['A Pack-A-Punched gun', 'Death Machine', 'Monkey Bombs'],
  },
  {
    id: 'b6813f4f-dfe3-4d80-8a41-09c86c7c469d',
    question:
      'In World of Warcraft, What was the name of the spell that caused a plague that famously killed millions of players in 2005?',
    correctAnswer: 'Corrupted Blood',
    incorrectAnswers: ['Necrotic Plague', 'Unbound Infestation', 'Mutated Infection'],
  },
  {
    id: '3b3817d3-bbd8-46e8-a9c2-10096ba21cb3',
    question: `In "Paper Mario: The Thousand Year Door", what is Hooktail&'s weakness?`,
    correctAnswer: 'The Sound of Crickets',
    incorrectAnswers: ['Attacks from Koopas', 'The "Ice Storm" Item', 'The Hammer'],
  },
  {
    id: '79f2a548-103c-4ea8-8369-bdd4af70d4ff',
    question: 'The country of Belize borders which country?',
    correctAnswer: 'Guatemala',
    incorrectAnswers: ['Laos', 'Per&uacute;', 'Kenya'],
  },
  {
    id: '9047e600-45db-415e-bd92-bf377ac8b419',
    question: `Who proved Fermat's Last Theorem?`,
    correctAnswer: 'Andrew Wiles',
    incorrectAnswers: ['Leonhard Euler', 'Carl Friedrich Gauss', 'Srinivasa Ramanujan'],
  },
  {
    id: 'ed7e7c87-411a-4de8-b088-b5a62e568383',
    question: 'In ancient Greece, if your job were a "hippeus" which of these would you own?',
    correctAnswer: 'Horse',
    incorrectAnswers: ['Weave', 'Guitar', 'Boat'],
  },
];

type QuizModel = {
  questions: QuestionModel[];
};

const QUIZ = {
  questions: QUESTIONS,
};

async function getQuiz(req: Request, res: Response): Promise<unknown> {
  return res.json(QUIZ);
}

export const QuizService = { getQuiz };
