import { z } from "zod";

export const createOneSurveySchema = z.object({
  name: z.string().nullish(),
  type: z.string().nullish(),
  structure: z.any(),
  email: z.string().email(),
});

export const createOneSurveyAnswerSchema = z.object({
  surveyId: z.string(),
  payload: z.any(),
});

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type TFormSurvey = {
  type: "SAMPLE_GENERAL";
  name: string;
  validation: any;
  structure: TFormSurveyStructure[];
};

export type TFormSurveyStructure = {
  value: string;
  label: string;
  type: "choice" | "text";
  question: string;
  choices?: string[];
};

export const formSurveys: TFormSurvey[] = [
  {
    type: "SAMPLE_GENERAL",
    name: "General sample",
    validation: z.object({
      ratingOfProgram: z.string().min(1, { message: "Please choose a rating" }),
      textQuestionA: z.string(),
      textQuestionB: z.string(),
      textQuestionC: z.string(),
      textQuestionD: z.string(),
      textQuestionE: z.string(),
      textQuestionF: z.string(),
    }),
    structure: [
      {
        value: "ratingOfProgram",
        label: "Rating",
        type: "choice",
        question: "How would your rate the quality of this program?",
        choices: ["Poor", "Okay", "Good", "Very Good"],
      },
      {
        value: "textQuestionA",
        label: "Achieved program?",
        type: "text",
        question:
          "So you feel that the program achieved what is was designed to?",
      },
      {
        value: "textQuestionB",
        label: "Imporved QoL?",
        type: "text",
        question:
          "Do you feel that your quality of life has improved as a result of this program",
      },
      {
        value: "textQuestionC",
        label: "Decision Making?",
        type: "text",
        question:
          "Were you involved in any decision-making throughout the program?",
      },
      {
        value: "textQuestionD",
        label: "Culture respected?",
        type: "text",
        question:
          "Do you feel that your culture was respected and considered throughout the program?",
      },
      {
        value: "textQuestionE",
        label: "Work again?",
        type: "text",
        question: "Would you want this organization to work with you again?",
      },
      {
        value: "textQuestionF",
        label: "Program Feedback?",
        type: "text",
        question: "Tell us what you thought about the program",
      },
    ],
  },
];
