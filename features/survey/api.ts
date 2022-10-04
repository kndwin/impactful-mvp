import { Prisma } from "@prisma/client";
import { t } from "common/api/server/trpc";
import { z } from "zod";
import { prismaClient as prisma } from "common/db";
import * as schemas from "./schemas";

export const surveyRouter = t.router({
  getAllSurveys: t.procedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const allSurvey = await prisma?.survey.findMany({
        where: {
          email: input.email,
        },
      });
      return allSurvey;
    }),
  getOneSurvey: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const survey = await prisma?.survey.findFirst({
        where: {
          id: input.id,
        },
      });
      return survey;
    }),
  getAllSurveysWithAnswers: t.procedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        survey: `hello: ${input?.text}`,
      };
    }),
  getOneSurveyWithAnswers: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const survey = await prisma?.survey.findFirst({
        where: {
          id: input.id,
        },
        include: {
          SurveyAnswer: true,
        },
      });
      return survey;
    }),
  createOneSurveyAnswer: t.procedure
    .input(schemas.createOneSurveyAnswerSchema)
    .mutation(async ({ input }) => {
      const newSurveyAnswer = await prisma?.surveyAnswer.create({
        data: input,
      });
      return newSurveyAnswer;
    }),
  createOneSurvey: t.procedure
    .input(schemas.createOneSurveySchema)
    .mutation(async ({ input }) => {
      const newSurvey = await prisma?.survey.create({
        data: input,
      });
      return newSurvey;
    }),
});
