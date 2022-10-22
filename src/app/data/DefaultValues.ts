import { Controller } from "../models/Controller";
import { Question } from "../models/Question";
import { QuestionOption } from "../models/QuestionOption";
import { QuestionOptionVote } from "../models/QuestionOptionVote";
import { Quiz } from "../models/Quiz";
import { Team } from "../models/Team";
import { Teams } from "../models/Teams";

const defaultControllers: Controller[] = [
    {
        buttonOffset: 0,
    },
    {
        buttonOffset: 5,
    },
    {
        buttonOffset: 11,
    },
    {
        buttonOffset: 17,
    },
] as Controller[];

const defaultTeams: Team[] = [
    {
        controller: getDefaultControllers()[0],
        name: Teams.ONE,
        score: 0,
    },
    {
        controller: getDefaultControllers()[1],
        name: Teams.TWO,
        score: 0,
    },
    {
        controller: getDefaultControllers()[2],
        name: Teams.THREE,
        score: 0,
    },
    {
        controller: getDefaultControllers()[3],
        name: Teams.FOUR,
        score: 0,
    },
] as Team[];

defaultControllers[0].team = defaultTeams[0];
defaultControllers[1].team = defaultTeams[1];
defaultControllers[2].team = defaultTeams[2];
defaultControllers[3].team = defaultTeams[3];

export function getDefaultControllers(): Controller[] {
    return defaultControllers;
}

export function getDefaultTeams(): Team[] {
    return defaultTeams
}

export function getDefaultQuiz(): Quiz {
    return {
        questions: [
            {
                text: "¿Qué escritor famoso tenía una mujer con el nombre de la cumpleañera?",
                options: [
                    {
                        text: "Charles Dickens",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Simone de Beauvoir",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Edgar Allan Poe",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Oscar Wilde",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué película se estrenó el mismo año, mes y día que nació la cumpleañera?",
                options: [
                    {
                        text: "Malcomo",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Pesadilla Antes de Navidad",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "El regreso de las Brujas",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "El día de la marmota",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
        ] as Question[],
    } as Quiz;
}