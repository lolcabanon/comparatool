<script>
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	import { Trash2 } from 'lucide-svelte';

	const { data } = $props();

	const types = $derived(data.types);
</script>

<main>
	<h1>Welcome to Comparatool!</h1>

	<section>
		<form method="POST" use:enhance>
			<h2>Ajouter une catégorie</h2>

			<div class="field">
				<label for="type">Type</label>
				<input type="text" name="type" id="type" required />
			</div>

			<div class="field">
				<label for="label">Label</label>
				<input type="text" name="label" id="label" required />
			</div>

			<div>
				<button>GO!</button>
			</div>
		</form>
	</section>

	<section>
		<h2>Catégories</h2>

		<ul>
			{#each types as { type, label }}
				<li>
					<a href="/{type}">{label}</a>
					<button
						class="ghost"
						onclick={async (e) => {
							await fetch(`/${type}`, { method: 'DELETE' });
							await invalidateAll();
						}}><Trash2 size="1em" /></button
					>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style lang="scss">
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2em;

		padding: 0.5em 1em;

		border-radius: var(--bora);

		&:has(button:hover, button:focus-visible) {
			outline: 1px solid var(--clr-red);
		}
	}

	form {
		display: grid;
		gap: 1em;

		> div {
			text-align: center;
		}
	}

	label {
		display: block;
		margin-bottom: 0.25em;
	}
</style>
