import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { FormSurvey } from "features/survey";
import { useOneSurveyQuery } from "features/survey/hook";
import { Survey } from "@prisma/client";

export default function SurveyPage() {
  const router = useRouter();
  const { query } = useOneSurveyQuery({ id: router.query?.id as string });

  if (Boolean(query.isLoading)) {
    return <div>Loading</div>;
  }

  if (Boolean(query.isError)) {
    console.log({ error: query.error });
    return <div>Something went wrong</div>;
  }

  if (!Boolean(query.data)) {
    return <div>No data</div>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <h1 className="text-xl font-bold">{query.data?.name}</h1>
      </StyledHeader>

      <StyledMain>
        <FormSurvey survey={query.data as Survey} />
      </StyledMain>

      <StyledFooter></StyledFooter>
    </StyledContainer>
  );
}

const StyledContainer = tw.div<any>`w-full h-full min-h-screen bg-stone-100`;
const StyledHeader = tw.header<any>`container mx-auto py-4 flex justify-between`;
const StyledMain = tw.main<any>`container mx-auto`;
const StyledFooter = tw.footer<any>`container mx-auto`;
