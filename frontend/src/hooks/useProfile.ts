import { MOCK_PROFILE } from "../mocks/profile";

export function useProfile() {
	return { profile: MOCK_PROFILE, loading: false };
}
