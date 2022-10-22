import { QuestionOptionVote } from "./QuestionOptionVote";

export interface QuestionOption {
    text: string;
    votes: QuestionOptionVote[];
}