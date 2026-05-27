<script>
	import { page } from '$app/stores';
	import { debounce, debounceAsync } from '$lib/debounce.js';
	import {
		Box,
		Boxes,
		Bug,
		Check,
		CloudOff,
		Edit,
		FolderGit2,
		Globe,
		Lightbulb,
		Loader,
		Package,
		Scroll,
		SquareArrowLeft,
		Star
	} from 'lucide-svelte';

	let { data } = $props();

	let tool = $state(data.tool);

	/**
	 * @type {[ import('svelte').ComponentType<import('lucide-svelte').Icon>, string, string | number | null ][]}
	 */
	let toolInfo = $derived([
		[Lightbulb, 'Name', tool.name],
		[Boxes, 'Type', tool.typeStr],
		[FolderGit2, 'Repo', tool.repo],
		[Globe, 'Site', tool.homepage],
		[Box, 'Pkg', tool.pkgName],
		[Scroll, 'Licence', tool.license],
		[Star, 'Stars', tool.stargazers_count],
		[Bug, 'Issues', tool.open_issues_count]
	]);

	/**
	 * @type {'saved' | 'pending' | 'saving' | 'error'}
	 */
	let saveState = $state('saved');

	/**
	 * @type {import('svelte/elements').FormEventHandler<HTMLTextAreaElement>}
	 */
	const saveNotes = debounceAsync(async (e) => {
		// console.log('FIRED onchange');

		saveState = 'saving';
		try {
			await fetch(`/${$page.params.type}/${$page.params.tool}`, {
				method: 'POST',
				body: tool.notes
			});
		} catch (e) {
			console.error(e);
			saveState = 'error';
		}
		saveState = 'saved';
	}, 1000);
</script>

<main>
	<h1><a href="/{$page.params.type}"><SquareArrowLeft size="1em" /></a> {tool.name}</h1>

	<section>
		<!-- <p>Name : {tool.name}</p> -->

		<!-- <ul>
			{#each Object.entries(tool) as [key, val]}
				<li>{key} : {val}</li>
			{/each}
		</ul> -->

		<table>
			<thead>
				<tr>
					{#each toolInfo as [Icon, key]}
						<th>
							<span><Icon size="1em" /> {key}</span>
						</th>
					{/each}
				</tr>
			</thead>

			<tbody>
				<tr>
					{#each toolInfo as [_, key, val]}
						<td title={String(val ?? '')}>
							{#if ['Repo', 'Site'].includes(key) && val}
								<a href={String(val)}>{val}</a>
							{:else}
								{val}
							{/if}
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</section>

	<section>
		<label for="notes">
			<span>
				Notes
				{#if saveState === 'error'}
					<CloudOff />
				{:else if saveState === 'pending'}
					<Edit />
				{:else if saveState === 'saving'}
					<Loader />
				{:else}
					<Check />
				{/if}
			</span>
			<textarea
				name="notes"
				id="notes"
				bind:value={tool.notes}
				oninput={(e) => {
					saveState = 'pending';
					saveNotes(e);
				}}
				rows="8"
			></textarea>
		</label>
	</section>
</main>

<style lang="scss">
	table {
		thead {
			tr {
			}

			th {
			}
		}

		tbody {
			tr {
			}

			td {
			}
		}

		tr {
		}

		td,
		th {
			padding: 0.5em 1em;

			border: 1px solid currentColor;
			min-width: 15ch;
			max-width: 30ch;

			text-wrap: nowrap;
			text-overflow: ellipsis;

			overflow: clip;
		}

		th {
			span {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.5em;
			}
		}
	}

	label {
		font-weight: bold;

		span {
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.5em;
		}

		textarea {
			width: 80ch;
		}
	}
</style>
