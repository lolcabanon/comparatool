<script>
	import { enhance } from '$app/forms';

	import { ExternalLink } from 'lucide-svelte';

	import ToolsGrid from './ToolsGrid.svelte';
	import { untrack } from 'svelte';

	const { data, form } = $props();

	const newTool = $derived(form?.tool);

	let tools = $state(data.tools);
	const visibleTools = $derived(tools.filter((t) => !t.hide));
	const hiddenTools = $derived(tools.filter((t) => t.hide));

	$effect(() => {
		newTool && untrack(() => tools.push(newTool));
	});

	const pkgsString = $derived(
		visibleTools
			.filter((t) => t.pkgName)
			.map((t) => t.pkgName)
			.join('-vs-')
	);

	let showHidden = $state(true);
</script>

<main>
	<h1>Compare <u>{tools.find((v) => v.type?.label)?.type?.label ?? 'unknown'}</u> tools</h1>

	<section>
		<form method="POST" use:enhance>
			<h2>Met le lien GitHub la dedans!!!</h2>

			{#if form?.message}
				<p class="invalid">
					{form.message}
				</p>
			{/if}

			<input type="text" name="repo_url" id="repo_url" />
			<button>GO!</button>
		</form>
	</section>

	<section>
		<!-- <h2>Une belle tite liste</h2> -->

		<!-- {@const visibleTools = tools.filter((t) => !t.hide)}
			{@const hiddenTools = tools.filter((t) => t.hide)} -->

		<a href="https://npmtrends.com/{pkgsString}" target="_blank"
			>See on npmtrends.com <ExternalLink size="1em" /></a
		>

		<ToolsGrid tools={visibleTools} />

		<h2 class="h">
			Hidden <button onclick={(e) => (showHidden = !showHidden)}>
				{showHidden ? 'fold' : 'unfold'}
			</button>
		</h2>

		{#if showHidden}
			<ToolsGrid tools={hiddenTools} />
		{/if}
	</section>
</main>

<style lang="scss">
	h2.h {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
</style>
