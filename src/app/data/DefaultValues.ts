import { Controller } from "../models/Controller";
import { Question } from "../models/Question";
import { QuestionOption } from "../models/QuestionOption";
import { QuestionOptionVote } from "../models/QuestionOptionVote";
import { Quiz } from "../models/Quiz";
import { Team } from "../models/Team";
import { Teams } from "../models/Teams";

export function getDefaultControllers(): Controller[] {
    return [
        {
            buttonOffset: 0,
            team: Teams.ONE,
        },
        {
            buttonOffset: 5,
            team: Teams.TWO,
        },
        {
            buttonOffset: 11,
            team: Teams.THREE,
        },
        {
            buttonOffset: 17,
            team: Teams.FOUR,
        },
    ] as Controller[];
}

export function getDefaultTeams(): Team[] {
    return [
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
}

export function getDefaultQuiz(): Quiz {
    return {
        questions: [
            {
                text: "Cast your votes",
                options: [
                    {
                        text: "A",
                        votes: [
                            {
                                team: getDefaultTeams()[0],
                            }
                        ],
                    } as QuestionOption,
                    {
                        text: "B",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "C",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "D",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
        ] as Question[],
    } as Quiz;
}