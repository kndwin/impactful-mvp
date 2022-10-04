import { Survey } from "@prisma/client"
import create from "zustand"

type TSurveyStore = {
	selectedSurvey?: Survey
	setSelectedSurvey: (selectedSurvey: Survey) => void
}

export const useSurveyStore = create<TSurveyStore>()((set) => ({
  selectedSurvey: undefined,
	setSelectedSurvey: (selectedSurvey) => set(() => ({ selectedSurvey}))
}))
