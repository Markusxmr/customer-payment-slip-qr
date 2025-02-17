<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
	import { store } from '$lib/store';
	import 'bootstrap/dist/css/bootstrap.css';
	import 'handsontable/dist/handsontable.full.css';
	import '../css/index.scss';

	export const prerender = false;

	afterNavigate(({ from, to }) => {
		if (!$store?.user && to?.route.id !== '/signin') {
			goto('/signin');
		}
	});
</script>

<div class="container-fluid">
	{#if $store?.user}
		<div class="noprint" style="margin-bottom: 89px">
			<Navbar />
		</div>
	{/if}

	<div>
		<slot />
	</div>
</div>

<footer class="py-1" style="position: fixed; bottom: -50px; width: 100%; margin: 0 auto;">
	<div>
		<p class="text-center">
			© {new Date().getFullYear()}
			{import.meta.env?.VITE_CREDITATIONS ?? ''}
		</p>
		<ul class="list-unstyled d-flex">
			<li class="ms-3">
				<a class="link-dark" href="#"
					><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a
				>
			</li>
			<li class="ms-3">
				<a class="link-dark" href="#"
					><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a
				>
			</li>
			<li class="ms-3">
				<a class="link-dark" href="#"
					><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a
				>
			</li>
		</ul>
	</div>
</footer>
