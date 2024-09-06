<script>
	import frCA from '$lib/_frCA';
	import { copyPkgNAme } from '$lib/copyPkgName';
	import { DATE_FORMAT } from '$lib/DATE_FORMAT';
	import { sortAlpha } from '$lib/sortAlpha';
	import { toggleHide } from '$lib/toggleHide';
	import { format, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
	import { Bug, Cake, Clock, Copy, Star } from 'lucide-svelte';

	/**
	 * @type {{ tools: Tool[] }}
	 */
	const { tools } = $props();
</script>

<ul>
	{#each tools.sort(sortAlpha) as tool, i (tool.id)}
		<!-- {@const pkgName = pkgs.find((t) => t && t[0] === tool.name)?.[1]} -->
		{@const pkgName = tool.pkgName}

		<li title={tool.notes}>
			<span class="hide"><button onclick={(e) => toggleHide(tool)}>hide</button></span>

			<header>
				<h3>
					<a href="/{tool.typeStr}/{tool.id}">{tool.name}</a>
					{#if pkgName}
						<button
							class="ghost"
							title="pn i -D {pkgName}"
							onclick={(e) => copyPkgNAme(e, pkgName)}
						>
							<Copy size="1em" />
						</button>
					{/if}
				</h3>
				<span class="licence">
					{tool.license}
				</span>
			</header>

			<p>
				Repo : <a href={tool.repo} target="_blank">{tool.repo}</a>
			</p>

			<p>
				Website :
				{#if tool.homepage}
					<a href={tool.homepage} target="_blank">{tool.homepage}</a>
				{:else}
					Inconnu
				{/if}
			</p>

			<hr />

			<p class="metrics">
				<span class="time">
					<span
						class="age"
						title="Creation date : {format(tool.created_at, DATE_FORMAT.SHORT, {
							locale: frCA
						})}"
					>
						<Cake size="1em" />
						{formatDistanceToNow(tool.created_at, { locale: frCA })}
					</span>

					<span
						class="freshness"
						title="Last push date : {format(tool.pushed_at, DATE_FORMAT.SHORT, {
							locale: frCA
						})}"
					>
						<Clock size="1em" />
						{formatDistanceToNowStrict(tool.pushed_at, { locale: frCA })}
					</span>
				</span>

				<span class="stars" title="Stars">
					<Star size="1em" />
					{tool.stargazers_count}
				</span>

				<span class="issues" title="Issues">
					<Bug size="1em" />
					{tool.open_issues_count}
				</span>
			</p>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2em;

		width: min(100%, 200ch);

		padding-inline: clamp(2em, 12vw, 12em);
		margin-inline: auto;
	}

	li {
		position: relative;

		display: flex;
		flex-direction: column;
		gap: 0.8em;

		padding: 0 1em 1em;
		background: var(--clr-offwhite);
		border-radius: 0.5em;

		box-shadow: 2px 2px 8px 0px var(--shadow-300);

		&:not(:hover) {
			.hide {
				opacity: 0;
				pointer-events: none;
			}
		}

		a {
			overflow-wrap: anywhere;
		}

		hr {
			margin-top: auto;
			width: 100%;
		}

		> * {
			margin: 0;
		}

		.hide {
			position: absolute;

			display: flex;
			justify-content: flex-end;

			top: 0;
			right: 0;
			// left: 0;

			transform: translate(50%, -50%);

			button {
				font-family: monospace;
				padding: 0.5em;
				margin-bottom: 0.5em;
				// border: 1px solid color-mix(in srgb, currentColor, transparent 80%);
				border: none;
				border-radius: var(--bora);

				box-shadow: 2px 2px 8px -2px var(--shadow-300);

				&:hover {
					color: red;
					text-decoration: 1px underline solid currentColor;
				}
			}
		}

		header {
			display: flex;
			align-items: flex-start;
			gap: 0.5em;
			padding-top: 0.5em;
		}

		h3 {
			margin: 0;
			font-size: 1.4em;
			font-variant: small-caps;
		}
		.licence {
			display: inline-block;
			font-size: 0.8rem;
			margin-left: auto;

			text-wrap: nowrap;
		}
	}

	.metrics {
		display: flex;
		gap: 1em;
		justify-content: flex-end;

		// margin-top: 1em;
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

		> span {
			border-radius: 0.5em;
			background: white;
			padding-inline: 0.5em;
		}
	}

	.stars {
		filter: drop-shadow(2px 2px 4px var(--clr-yellow));
	}

	.issues {
		filter: drop-shadow(2px 2px 4px var(--clr-red));
	}
</style>
