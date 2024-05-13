import type { PageLoad } from './$types';
import { articleManager } from '$lib/core/article';

export const load: PageLoad = async () => {
	const articles = await articleManager.getRecentNthArticles(3);
	return {
		articles
	};
};
