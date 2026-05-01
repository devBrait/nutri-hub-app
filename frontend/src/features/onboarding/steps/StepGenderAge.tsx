import type { OnboardingData } from "../../../types/onboarding";
import type { Gender } from "../../../types/profile";
import NumberField from "../components/NumberField";
import OptionPicker from "../components/OptionPicker";

interface StepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const GENDER_OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: "male", label: "Masculino", icon: "👨" },
  { value: "female", label: "Feminino", icon: "👩" },
  { value: "other", label: "Outro / Prefiro não dizer", icon: "🙂" },
];

export default function StepGenderAge({ data, setData }: StepProps) {
  return (
    <>
      <OptionPicker
        options={GENDER_OPTIONS}
        value={data.gender}
        onChange={(gender) => setData((d) => ({ ...d, gender }))}
      />
      <div style={{ height: 24 }} />
      <NumberField
        label="Idade"
        unit="anos"
        placeholder="Ex: 25"
        value={data.ageYears}
        onChange={(ageYears) => setData((d) => ({ ...d, ageYears }))}
      />
    </>
  );
}
