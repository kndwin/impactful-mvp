import { trpc } from "common/api/hooks";
import { useSession } from "next-auth/react";
import { useSurveyStore } from "features/survey/store";

// Wrapped hooks query + mutation hooks if ever I need to switch out tRPC with GraphQL

export const useOneSurveyQuery = ({ id }: { id: string }) => {
  const query = trpc.survey.getOneSurvey.useQuery(
    { id },
    {
      enabled: Boolean(id),
    }
  );

  return {
    query,
  };
};

export const useOneSurveyWithAnswersQuery = ({ id }: { id: string }) => {
  const query = trpc.survey.getOneSurveyWithAnswers.useQuery(
    { id },
    {
      enabled: Boolean(id),
    }
  );

  return {
    query,
  };
};

export const useAllSurveyQuery = () => {
  const setSelected = useSurveyStore((s) => s.setSelectedSurvey);
  const selected = useSurveyStore((s) => s.selectedSurvey);
  const { data } = useSession();
  const email = data?.user?.email as string;
  const query = trpc.survey.getAllSurveys.useQuery(
    { email },
    {
      onSuccess: (data) => {
        if (data.length > 0 && !Boolean(selected)) {
          setSelected(data[0]);
        }
      },
      enabled: Boolean(email),
    }
  );

  return {
    query,
  };
};

export const useCreateOneSurveyMutation = () => {
  const client = trpc.useContext();
  const mutation = trpc.survey.createOneSurvey.useMutation({
    onSuccess: () => {
      client.survey.getAllSurveys.invalidate();
    },
  });
  return {
    mutation,
  };
};

export const useCreateOneSurveyAnswerMutation = () => {
  const client = trpc.useContext();
  const mutation = trpc.survey.createOneSurveyAnswer.useMutation({
    onSuccess: () => {
      client.survey.getAllSurveys.invalidate();
    },
  });
  return {
    mutation,
  };
};
