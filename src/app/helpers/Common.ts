import * as moment from "moment";
import { Configuration } from "../config/Configuration";
import { BuzzControllerButton } from "../models/BuzzControllerButton";
import { Question } from "../models/Question";
import { QuestionOptionVote } from "../models/QuestionOptionVote";
import { Team } from "../models/Team";
import { GameStateMachine } from "../statemachine/GameStateMachine";

export function recalculateTeamScores(gameStateMachine: GameStateMachine) 
{
  for ( let team of gameStateMachine.gameState.teams ) {
    if ( hasTeamAnsweredQuestion(team, gameStateMachine.gameState.currentQuestion) && 
         checkIfTeamVotedQuestionCorrectly(team, gameStateMachine.gameState.currentQuestion) ) {
      team.score += Configuration.SCORE_EARNED_BY_RIGHT_GUESS;
    }
  }
}

export function buzzButtonToOptionIndex(buzzButton: number) {
    return 4 - buzzButton;
}

export function isOptionButton(buzzControllerButton: BuzzControllerButton): boolean {
    return buzzControllerButton == BuzzControllerButton.BLUE ||
      buzzControllerButton == BuzzControllerButton.GREEN ||
      buzzControllerButton == BuzzControllerButton.YELLOW ||
      buzzControllerButton == BuzzControllerButton.ORANGE;
}

export function hasTeamAnsweredQuestion(team: Team, question: Question) {
    let voted = false;
    for (let option of question.options) {
      voted = voted || (option.votes.filter((vote: QuestionOptionVote) => {
        return vote.team.name === team.name;
      }).length > 0)
    }
    return voted;
}

export function hasTeamAnsweredCurrentQuestion(team: Team, gameStateMachine: GameStateMachine): boolean {
    return hasTeamAnsweredQuestion(team, gameStateMachine.gameState.currentQuestion);
}

export function checkIfTeamVotedQuestionCorrectly(team: Team, question: Question) {
    for (let option of question.options) {
      const chosenOption = option.votes.filter((vote: QuestionOptionVote) => {
        return vote.team.name === team.name;
      });
      if ( chosenOption.length > 0 ) {
        return option.correct;
      }
    }
    return false;
}


export function formatSecondsToMMSS(seconds: number): string {
  return moment.utc(seconds * 1000).format('mm:ss');
}
