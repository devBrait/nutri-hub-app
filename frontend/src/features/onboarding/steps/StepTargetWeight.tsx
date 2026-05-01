import type { OnboardingData } from "../../../types/onboarding";
import NumberField from "../components/NumberField";

interface StepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

export default function StepTargetWeight({ data, setData }: StepProps) {
  return (
    <NumberField
      label="Peso objetivo"
      unit="kg"
      placeholder="Ex: 70"
      value={data.goalWeightKg}
      onChange={(goalWeightKg) => setData((d) => ({ ...d, goalWeightKg }))}
    />
  );
}
