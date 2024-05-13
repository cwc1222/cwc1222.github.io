import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { articleManager } from '$lib/core/article';

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	const article = await articleManager.getArticle(slug);
	if (!article) {
		error(404, `Article ${slug} not found`);
	}
	return {
		article
	};
};
