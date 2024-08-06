<script>
	import { enhance } from '$app/forms';

	import { Star, Bug, Cake, Clock, Copy, ExternalLink } from 'lucide-svelte';

	import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
	import { frCA } from 'date-fns/locale';

	const { data, form } = $props();

	const tools = $derived(data.tools);

	const pkgs = $derived(data.pkgs);

	/**
	 * @param {Tool} a
	 * @param {Tool} b
	 */
	const sortAlpha = (a, b) => {
		const nameA = a.name.toUpperCase(); // ignore upper and lowercase
		const nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}

		// names must be equal
		return 0;
	};

	/**
	 *
	 * @param {Event} e
	 * @param {string} pkgName
	 */
	const copyPkgNAme = (e, pkgName) => {
		navigator.clipboard.writeText(`pn i -D ${pkgName}`);
	};
</script>

<main>
	<h1>
		Compare <u>
			{#await tools}
				...
			{:then the_tools}
				{the_tools.find((v) => v.type?.label)?.type?.label ?? 'unknown'}
			{/await}
		</u> tools
	</h1>

	<section>
		<form method="POST" use:enhance>
			<h2>Met le lien GitHub la dedans!!!</h2>

			{#if form?.message}
				<p class="invalid">
					{form.message ?? ''}
				</p>
			{/if}

			<input type="text" name="repo_url" id="repo_url" />
			<button>GO!</button>
		</form>
	</section>

	<section>
		<h2>Une belle tite liste</h2>

		{#await tools}
			loading...
		{:then the_tools}
			<a
				href="https://npmtrends.com/{pkgs
					.map((p) => (p ? p[1] : null))
					.filter((p) => p)
					.join('-vs-')}"
				target="_blank">See on npmtrends.com <ExternalLink size="1em" /></a
			>

			<ul>
				{#each the_tools.sort(sortAlpha) as tool, i (tool.id)}
					{@const pkgName = pkgs.find((t) => t && t[0] === tool.name)?.[1]}

					<li>
						<header>
							<h3>
								{tool.name}
								<button
									class="ghost"
									title={pkgName ? `pn i -D ${pkgName}` : undefined}
									onclick={(e) => copyPkgNAme(e, pkgName)}
								>
									<Copy size="1em" />
								</button>
							</h3>
							<span class="licence">
								{tool.license}
							</span>
						</header>

						<p>
							Repo : <a href={tool.repo} target="_blank"> {tool.repo}</a>
						</p>

						<p>
							Website :<a href={tool.homepage} target="_blank"> {tool.homepage}</a>
						</p>

						<hr />

						<p class="metrics">
							<span class="time">
								<span class="age">
									<Cake />
									{formatDistanceToNow(tool.created_at, { locale: frCA })}
								</span>

								<span class="freshness">
									<Clock />
									{formatDistanceToNowStrict(tool.pushed_at, { locale: frCA })}
								</span>
							</span>

							<span class="stars">
								<Star />
								{tool.stargazers_count}
							</span>

							<span class="issues">
								<Bug />
								{tool.open_issues_count}
							</span>
						</p>
					</li>
				{/each}
			</ul>
		{/await}
	</section>
</main>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2em;
	}

	li {
		padding: 0 1em;
		background: var(--clr-offwhite);
		border-radius: 0.5em;

		box-shadow: 2px 2px 8px 0px var(--shadow-300);

		header {
			display: flex;
			align-items: flex-end;
		}

		h3 {
			margin: 1rem 0 0;
			font-size: 1.4em;
			font-variant: small-caps;
		}
		.licence {
			display: inline-block;
			font-size: 0.8rem;
			margin-left: auto;
		}
	}

	.metrics {
		display: flex;
		gap: 1em;
		justify-content: flex-end;

		margin-top: 1em;
	}

	.age,
	.freshness,
	.stars,
	.issues {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
	}

	.time {
		display: inline-flex;
		gap: 0.5em;

		margin-right: auto;
	}

	.stars {
		filter: drop-shadow(2px 2px 4px var(--clr-yellow));
	}

	.issues {
		filter: drop-shadow(2px 2px 4px var(--clr-red));
	}
</style>
