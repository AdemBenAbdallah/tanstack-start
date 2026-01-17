declare module "content-collections" {
	export type Speaker = {
		name: string;
		title: string;
		specialty: string;
		restaurant: string;
		location: string;
		headshot: string;
		awards?: string[];
		content: string;
		slug: string;
	};

	export type Talk = {
		title: string;
		speaker: string;
		duration: string;
		image: string;
		topics: string[];
		content: string;
		slug: string;
	};

	export const allSpeakers: Speaker[];
	export const allTalks: Talk[];
}
