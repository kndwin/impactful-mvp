import tw from "tailwind-styled-components";
import { useSurveyStore } from "../store";
import { Prisma } from "@prisma/client";
import { TFormSurveyStructure } from "features/survey/schemas";
import { useOneSurveyWithAnswersQuery } from "features/survey/hook";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import {  Tooltip} from 'flowbite-react'

export function SurveyTable() {
  const selectedSurvey = useSurveyStore((s) => s.selectedSurvey);
  const { query } = useOneSurveyWithAnswersQuery({
    id: selectedSurvey?.id as string,
  });
  const headers = query.data?.structure as TFormSurveyStructure[];
  return (
    <StyledOverflowContainer>
      <StyledTable>
        <StyledTHead>
          <StyledHeaderRow>
            {headers?.map((header) => (
              <StyledHeader align="left">
                <div className="flex items-center gap-1">
                  <p>{header?.label}</p>
                  {Boolean(header?.question) && (
                    <Tooltip content={header?.question}>
                      <HiOutlineQuestionMarkCircle />
                    </Tooltip>
                  )}
                </div>
              </StyledHeader>
            ))}
          </StyledHeaderRow>
        </StyledTHead>
        <StyledTBody>
          {query.data?.SurveyAnswer?.map((row) => (
            <StyledRow key={row.id}>
              {(row?.payload as Prisma.JsonArray)?.map(
                ({ key, value }: any, index: number) => (
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
const StyledTHead = tw.thead<any>`bg-white border-b border-b-zinc-200 text-sm
`;
const StyledTBody = tw.tbody<any>``;
const StyledHeaderRow = tw(StyledRow)<any>``;
const StyledHeader = tw.th<any>`p-4`;
