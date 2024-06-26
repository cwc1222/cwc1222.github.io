import type { LayoutLoad } from './$types';
import type { MenuInfo, Theme } from '$lib/core/types';
import avatar from '$lib/assets/avatar_500x500.webp';

export const prerender = true;

export const load: LayoutLoad = () => {
	const gitscusConfig = {
		repo: 'cwc1222/cwc1222.github.io',
		repoId: 'R_kgDOLvsFtg',
		categoryId: 'DIC_kwDOLvsFts4CfVRU'
	};
	const defaultTheme: Theme = 'dark';
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
				name: 'x-twitter',
				class: 'link-secondary',
				icon: `<i class="fa-brands fa-x-twitter"></i>`,
				url: 'https://twitter.com/walker0881'
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
	return {
		defaultTheme,
		gitscusConfig,
		menuInfo
	};
};
