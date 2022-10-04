import tw from "tailwind-styled-components";
import { useSurveyStore } from "../store";
import { useOneSurveyWithAnswersQuery } from "../hook";
import { Prisma } from "@prisma/client";

export function SurveyTable() {
  const selectedSurvey = useSurveyStore((s) => s.selectedSurvey);
  const { query } = useOneSurveyWithAnswersQuery({
    id: selectedSurvey?.id as string,
  });
  const headers = query.data?.structure as Prisma.JsonArray;
  return (
    <StyledOverflowContainer>
      <StyledTable>
        <StyledTHead>
          <StyledHeaderRow>
            {headers?.map((header: any) => (
              <StyledHeader align="left">{header?.label}</StyledHeader>
            ))}
          </StyledHeaderRow>
        </StyledTHead>
        <StyledTBody>
          {query.data?.SurveyAnswer?.map((row) => (
            <StyledRow key={row.id}>
              {Object.values(row.payload as Prisma.JsonObject).map(
                (value: any) => (
                  <StyledCell>{value}</StyledCell>
                )
              )}
            </StyledRow>
          ))}
        </StyledTBody>
      </StyledTable>
    </StyledOverflowContainer>
  );
}

const StyledOverflowContainer = tw.div<any>`overflow-auto rounded-xl  
	h-fit w-full border border-zinc-200
	max-h-[calc(100vh-10em)] max-w-[calc(100vw-17em)] block
`;
const StyledTable = tw.table<any>`bg-white table-auto border-collapse w-full`;
const StyledRow = tw.tr<any>``;
const StyledCell = tw.td<any>`p-4 text-sm`;
const StyledTHead = tw.thead<any>`bg-white border-b border-b-zinc-200 text-sm`;
const StyledTBody = tw.tbody<any>``;
const StyledHeaderRow = tw(StyledRow)<any>``;
const StyledHeader = tw.th<any>`p-4`;
