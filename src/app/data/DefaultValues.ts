import { Controller } from "../models/Controller";
import { Question } from "../models/Question";
import { QuestionOption } from "../models/QuestionOption";
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
        icon: 'pumpkin.png',
        score: 0,
    },
    {
        controller: getDefaultControllers()[1],
        name: Teams.TWO,
        icon: 'bat.png',
        score: 0,
    },
    {
        controller: getDefaultControllers()[2],
        name: Teams.THREE,
        icon: 'skull.png',
        score: 0,
    },
    {
        controller: getDefaultControllers()[3],
        name: Teams.FOUR,
        icon: 'ghost.png',
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
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Oscar Wilde",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué película se rodó en 18 días?",
                options: [
                    {
                        text: "La Bruja de Blair",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "El Exorcista",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Saw",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Babadook",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué utilizaban en las películas en B y N para la sangre falsa?",
                options: [
                    {
                        text: "Zumo de remolacha",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Chocolate",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Salsa de soja",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Sangre de cerdo",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué película infantil iba a ser originalmente de terror?",
                options: [
                    {
                        text: "Casper",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Matilda",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "E.T. El Extraterrestre",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Solo en Casa",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "Debido al bajo presupuesto se compró la máscara más barata ¿De qué película hablamos?",
                options: [
                    {
                        text: "Scream",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Viernes 13",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Saw",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Halloween",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Cómo se llama la fobia a Halloween?",
                options: [
                    {
                        text: "Alektorofobia",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Xantofobia",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Chorofobia",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Samhainofobia",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué escritor de terror tiene más adaptaciones cinematográficas de sus obras?",
                options: [
                    {
                        text: "Edgar Allan Poe",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Stephen King",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "H. P. Lovecraft",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Agatha Christie",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Cuál era el nombre real de Jack O'Lantern?",
                options: [
                    {
                        text: "Stingy Jack",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Jack Sparrow",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Jack Halloween",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Jack Owen",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿De qué se fabricaron las primeras Jack-o-lanterns?",
                options: [
                    {
                        text: "Sandías",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Nabos",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Calabacines",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Cocos",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "El nombre de la cumpleañera significa casualmente lo que más teme ¿Qué significa su nombre?",
                options: [
                    {
                        text: "Lobo hambriento",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Oscuridad",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Fuego",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Tormenta",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿En qué película de terror matan accidentalmente al actor protagonista en una escena?",
                options: [
                    {
                        text: "El Cuervo",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Casper",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Déjame entrar",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "La Cosa",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿En qué dos días tiene lugar la celebración de los muertos en México?",
                options: [
                    {
                        text: "29 oct. y 30 oct.",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "30 oct. y 31 oct.",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "31 oct. y 1 nov.",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "1 nov. y 2 nov.",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué efecto puede producir la picadura de la araña del trigo?",
                options: [
                    {
                        text: "Enrojecimiento y picor de pezones",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Inflamación de testículos",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Erección prolongada durante horas",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Manchas violaceas",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Cuál fue el mayor número de personas enterradas vivas junto a un faraón?",
                options: [
                    {
                        text: "Unas 150",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Unas 220",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Unas 70",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Unas 300",
                        votes: [],
                        correct: true,
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
                        correct: true,
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
            {
                text: "En el cuento original de La Cenicienta, ¿qué hacen las villanas para conseguir al príncipe?",
                options: [
                    {
                        text: "Secuestrar a Cenicienta y torturarla",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Matar al mensajero real",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Cercenar los dedos de los pies y el talón de una de las hermanas",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Hipnotizar al príncipe",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Cuáles de estos son horrocruxes?",
                options: [
                    {
                        text: "Peonza, diente de leche y diario",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Bola de adivinación, reloj de arena y guardapelo",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Copa, anillo y dedal",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Guardapelo, diario y diadema",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "Coloquialmente, ¿a qué suceso se le llama \"Subida del muerto\"?",
                options: [
                    {
                        text: "Parálisis del sueño",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Ceguera transitoria",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Hipnotismo",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Efecto Troxler",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿A qué se le llama coloquialmente la manzana de Satán?",
                options: [
                    {
                        text: "Nuez de macadamia",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Fruta de la pasión",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Cereza",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Mandragora",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿En qué siglo tuvieron lugar los Juicios de Salem?",
                options: [
                    {
                        text: "Siglo XVI",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Siglo XV",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Siglo XVIII",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Siglo XVII",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Cuánto mide el calamar gigante más grande hallado hasta la fecha?",
                options: [
                    {
                        text: "10 metros",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "5 metros",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "17 metros",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "25 metros",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
            {
                text: "¿Qué es lo más grande que una pitón reticulada se ha comido?",
                options: [
                    {
                        text: "Vaca",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Persona",
                        votes: [],
                        correct: true,
                    } as QuestionOption,
                    {
                        text: "Ciervo",
                        votes: [],
                    } as QuestionOption,
                    {
                        text: "Lobo gris",
                        votes: [],
                    } as QuestionOption,
                ] as QuestionOption[],
            } as Question,
        ] as Question[],
    } as Quiz;
}