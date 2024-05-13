import type { LayoutLoad } from './$types';
import type { MenuInfo } from '$lib/core/types';
import avatar from '$lib/assets/avatar_500x500.webp';

export const prerender = true;

export const load: LayoutLoad = () => {
	const menuInfo: MenuInfo = {
		avatar: avatar,
		blogTitle: "cwc1222's blog",
		blogSubTitle: [
			'Computer Science',
			'Web Programming',
			'Distributed System',
			'Language Learning',
			'Taiwan',
			'Paraguay'
		],
		blogPages: [
			{
				name: 'Home',
				href: '/'
			},
			{
				name: 'Articles',
				href: '/articles'
			},
			{
				name: 'About',
				href: '/about'
			}
		],
		ccMessage: `<i class="fa-regular fa-closed-captioning"></i><span> cwc1222 2024</span>`,
		socialMedias: [
			{
				name: 'github',
				class: 'link-secondary',
				icon: `<i class="fa-brands fa-github"></i>`,
				url: 'https://github.com/cwc1222'
			},
			{
				name: 'linkedin',
				class: 'link-primary',
				icon: `<i class="fa-brands fa-linkedin"></i>`,
				url: 'https://www.linkedin.com/in/walker088-391429109'
			},
			{
				name: 'rss',
				class: 'link-secondary',
				icon: `<i class="fa-solid fa-rss"></i>`,
				url: '/rss.xml'
			}
		]
	};
	return menuInfo;
};
