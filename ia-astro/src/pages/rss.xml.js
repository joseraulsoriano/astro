import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			link: `/blog/${post.id}/`,
			title: post.data.title,
			pubDate: post.data.pubDate,
			description:
				post.data.description.trim().length > 0
					? post.data.description
					: `${post.data.title}: ${SITE_DESCRIPTION}`,
		})),
	});
}
