<script>
	import { enhance } from '$app/forms';

	import { Star, Bug, Calendar, Cake, Clock } from 'lucide-svelte';

	import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
	import { frCA } from 'date-fns/locale';

	/** @type {import('./$types').PageData} */
	export let data;

	$: tools = data.tools;
</script>

<main>
	<h1>Comparatool</h1>

	<section>
		<form method="POST" use:enhance>
			<h2>Met le lien GitHub la dedans!!!</h2>

			<input type="text" name="repo_url" id="repo_url" />
			<button>GO!</button>
		</form>
	</section>

	<section>
		<h2>Une belle tite liste</h2>

		<ul>
			{#await tools}
				loading...
			{:then the_tools}
				{#each the_tools.sort((a, b) => {
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
				}) as tool, i (tool.id)}
					<li>
						<header>
							<h3>
								{tool.name}
							</h3>
							<span class="licence">
								{tool.license}
							</span>
						</header>

						<p>
							Repo : <a href={tool.repo}> {tool.repo}</a>
						</p>

						<p>
							Website :<a href={tool.homepage}> {tool.homepage}</a>
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
			{/await}
		</ul>
	</section>
</main>

<style lang="scss">
	h1 {
		text-align: center;
	}

	section {
		display: grid;
		place-items: center;

		padding-inline: 4em;
		margin-block: 2em;
	}

	form {
		border: 2px solid #eee;
		padding: 2em;
		border-radius: 0.5em;

		h2 {
			margin-top: 0;
		}
	}

	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2em;

		list-style-type: none;
		padding: 0;
	}

	li {
		padding: 0 1em;
		background: #f4f4f4;
		border-radius: 0.5em;

		box-shadow: 2px 2px 8px 0px #33333340;

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
		filter: drop-shadow(2px 2px 4px hsl(60, 100%, 60%));
	}

	.issues {
		filter: drop-shadow(2px 2px 4px hsl(0, 100%, 60%));
	}
</style>
