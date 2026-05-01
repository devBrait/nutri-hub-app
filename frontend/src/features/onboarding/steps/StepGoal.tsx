import type { OnboardingData } from "../../../types/onboarding";
import type { Goal } from "../../../types/profile";
import OptionPicker from "../components/OptionPicker";

interface StepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const GOAL_OPTIONS: {
  value: Goal;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "lose",
    label: "Emagrecer",
    description: "Reduzir gordura corporal",
    icon: "📉",
  },
  {
    value: "maintain",
    label: "Manter",
    description: "Manter o peso atual",
    icon: "⚖️",
  },
  {
    value: "gain",
    label: "Ganhar massa",
    description: "Aumentar massa muscular",
    icon: "💪",
  },
];

export default function StepGoal({ data, setData }: StepProps) {
  return (
    <OptionPicker
      options={GOAL_OPTIONS}
      value={data.goal}
      onChange={(goal) => setData((d) => ({ ...d, goal }))}
    />
  );
}
