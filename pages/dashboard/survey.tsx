import { Layout, Button } from "common/ui";
import {
  ButtonModalCreateSurvey,
  SelectSurveyTable,
  SurveyTable,
} from "features/survey";
import { useSurveyStore } from "features/survey/store";
import { getBaseUrl } from "common/utils";
import { HiOutlineRefresh } from "react-icons/hi";
import { useOneSurveyWithAnswersQuery } from "features/survey/hook";

export default function DashboardSurveyPage() {
  const selected = useSurveyStore((s) => s.selectedSurvey);
  const surveyLink = `${getBaseUrl()}/survey/${selected?.id}`;
  const { query } = useOneSurveyWithAnswersQuery({
    id: selected?.id as string,
  });
  return (
    <Layout>
      <Layout.Header>
        <p className="text-lg font-bold">Survey</p>
      </Layout.Header>
      <Layout.Main>
        <div className="flex items-center justify-between h-12 mb-4">
          <div className="flex items-center gap-4 ">
            <SelectSurveyTable />
            {Boolean(selected) && (
              <Button className="w-8 h-8 px-2" onClick={() => query?.refetch()}>
                <HiOutlineRefresh />
              </Button>
            )}
          </div>
          <div className="flex px-4 py-2 bg-white border rounded-lg border-zinc-200">
            {Boolean(selected) ? (
              <a href={surveyLink} target="_blank">
                {surveyLink}
              </a>
            ) : (
              <p>No survey selected</p>
            )}
          </div>
          <ButtonModalCreateSurvey />
        </div>
        <SurveyTable />
      </Layout.Main>
    </Layout>
  );
}
