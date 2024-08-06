<script>
	import '../styles/main.scss';
	import 'sanitize.css';

	import { Home } from 'lucide-svelte';
</script>

<nav>
	<a href="/">
		<Home />
	</a>
</nav>

<slot />

<style lang="scss">
	nav {
		padding: 0.5em;
		border-bottom: 2px solid var(--clr-offwhite);
	}
</style>
