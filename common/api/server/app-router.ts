import { surveyRouter } from "features/survey/api";
import { t } from "./trpc";

export const appRouter = t.router({
	survey: surveyRouter
}
);

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
