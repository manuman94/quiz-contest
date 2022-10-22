import { Controller } from "../models/Controller";
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