import type { OnboardingData } from "../../../types/onboarding";
import type { ActivityLevel } from "../../../types/profile";
import OptionPicker from "../components/OptionPicker";

interface StepProps {
	data: OnboardingData;
	setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const ACTIVITY_OPTIONS: {
	value: ActivityLevel;
	label: string;
	description: string;
	icon: string;
}[] = [
	{
		value: "sedentary",
		label: "Sedentário",
		description: "Pouco ou nenhum exercício",
		icon: "🛋️",
	},
	{
		value: "light",
		label: "Levemente ativo",
		description: "1 a 3 dias/semana",
		icon: "🚶",
	},
	{
		value: "moderate",
		label: "Moderadamente ativo",
		description: "3 a 5 dias/semana",
		icon: "🏃",
	},
	{
		value: "active",
		label: "Muito ativo",
		description: "6 a 7 dias/semana",
		icon: "🚴",
	},
	{
		value: "very_active",
		label: "Atleta",
		description: "Treino intenso diário",
		icon: "🏋️",
	},
];

export default function StepActivity({ data, setData }: StepProps) {
	return (
		<OptionPicker
			options={ACTIVITY_OPTIONS}
			value={data.activityLevel}
			onChange={(activityLevel) => setData((d) => ({ ...d, activityLevel }))}
		/>
	);
}
