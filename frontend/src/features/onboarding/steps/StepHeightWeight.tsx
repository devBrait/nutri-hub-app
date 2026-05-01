import type { OnboardingData } from "../../../types/onboarding";
import NumberField from "../components/NumberField";

interface StepProps {
	data: OnboardingData;
	setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

export default function StepHeightWeight({ data, setData }: StepProps) {
	return (
		<>
			<NumberField
				label="Altura"
				unit="cm"
				placeholder="Ex: 175"
				value={data.heightCm}
				onChange={(heightCm) => setData((d) => ({ ...d, heightCm }))}
			/>
			<NumberField
				label="Peso atual"
				unit="kg"
				placeholder="Ex: 80"
				value={data.currentWeightKg}
				onChange={(currentWeightKg) =>
					setData((d) => ({ ...d, currentWeightKg }))
				}
			/>
		</>
	);
}
