const MONTHS_PT = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez",
];

export function formatShortDatePtBr(isoDate: string): string {
	const date = new Date(`${isoDate}T00:00:00`);
	const today = new Date();
	const isSameDay =
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate();
	const day = date.getDate().toString().padStart(2, "0");
	const month = MONTHS_PT[date.getMonth()];
	return isSameDay ? `Hoje, ${day} ${month}` : `${day} ${month}`;
}

export function formatMonthYear(isoDate: string): string {
	const date = new Date(`${isoDate}T00:00:00`);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	return `${month}/${date.getFullYear()}`;
}

export function shiftDateIsoByDays(isoDate: string, days: number): string {
	const date = new Date(`${isoDate}T00:00:00`);
	date.setDate(date.getDate() + days);
	return date.toISOString().slice(0, 10);
}

export function todayIso(): string {
	return new Date().toISOString().slice(0, 10);
}
