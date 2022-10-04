import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { FormTypeOne } from "features/survey";
import { useOneSurveyQuery } from "features/survey/hook";

export default function SurveyPage() {
  const router = useRouter();
  const { query } = useOneSurveyQuery({ id: router.query?.id as string });
  return (
    <StyledContainer>
      <StyledHeader>
        <h1 className="text-xl font-bold">{query.data?.name}</h1>
      </StyledHeader>

      <StyledMain>
        {query.data?.type === "1" && <FormTypeOne />}
      </StyledMain>

      <StyledFooter>
			</StyledFooter>
    </StyledContainer>
  );
}

const StyledContainer = tw.div<any>`w-full h-full min-h-screen bg-stone-100`;
const StyledHeader = tw.header<any>`container mx-auto py-4 flex justify-between`;
const StyledMain = tw.main<any>`container mx-auto`;
const StyledFooter = tw.footer<any>`container mx-auto`;
