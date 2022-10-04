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

