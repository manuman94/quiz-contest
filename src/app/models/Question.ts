import { QuestionOption } from "./QuestionOption";

export interface Question {
    text: string;
    options: QuestionOption[];
}