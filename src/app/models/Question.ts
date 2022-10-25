import { QuestionOption } from "./QuestionOption";

export interface Question {
    hidden: boolean;
    text: string;
    options: QuestionOption[];
}