import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "common/api/server/app-router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
