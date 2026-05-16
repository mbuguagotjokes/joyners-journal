<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ogImage from '$lib/assets/og-image.png';
    import Notifications from '$lib/components/Notifications.svelte';
    import Popup from '$lib/components/Popup.svelte';
	import "../style.css"
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Joyner's Journal</title>
	<meta property="og:type"         content="website" />
	<meta property="og:site_name"    content="Joyner's Journal" />
	<meta property="og:title"        content="Joyner's Journal" />
	<meta property="og:description"  content="Share thoughts, confessions, ideas, stories, or late-night realizations completely anonymously. No accounts. No profiles. No pressure." />
	<meta property="og:url"          content="https://journal.mbuguaaaaaa.xyz" />
	<meta property="og:image"        content={ogImage} />
	<meta property="og:image:width"  content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt"    content="Joyner's Journal — Anonymous thoughts, confessions, and stories." />
	<meta property="og:locale"       content="en_US" />

	<meta name="twitter:card"        content="summary_large_image" />
	<meta name="twitter:title"       content="Joyner's Journal" />
	<meta name="twitter:description" content="Share thoughts, confessions, ideas, stories, or late-night realizations completely anonymously. No accounts. No profiles. No pressure." />
	<meta name="twitter:image"       content={ogImage} />
	<meta name="twitter:image:alt"   content="Joyner's Journal — Anonymous thoughts, confessions, and stories." />

	<meta name="theme-color"         content="#D65780" />

	<link rel="canonical"            href="https://journal.mbuguaaaaaa.xyz" />
	<meta name="description"         content="Share thoughts, confessions, ideas, stories, or late-night realizations completely anonymously. No accounts. No profiles. No pressure." />
</svelte:head>

<Popup />
<Notifications />
<div class="layout">
	<header>
		<div class="logo">
			Joyner's Journal.
		</div>
		<div class="links">
			<button class="transparent icon">
				<a href="/">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l83.67-83.66,3.48,13.9-36.8,36.79a8,8,0,0,0,11.31,11.32l40-40a8,8,0,0,0,2.11-7.6l-6.9-27.61L227.32,96A16,16,0,0,0,227.32,73.37ZM48,179.31,76.69,208H48Zm48,25.38L51.31,160,136,75.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path></svg>
					Write
				</a>
			</button>
			<button class="transparent icon">
				<a href="/about">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path></svg>
					About
				</a>
			</button>
		</div>
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
	</footer>
</div>


<style>
	.layout {
		padding: 16px;
	}

	.logo {
		font-family: var(--font-sans);
		font-weight: 600;
		color: var(--main);
	}

	.links {
		display: flex;
		gap: 4px;
	}

	header {
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
		left: 0;
		padding: 16px 0;
		background-color: var(--white);
	}
</style>