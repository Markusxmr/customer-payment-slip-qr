<script lang="ts">
	import { page } from '$app/stores';
	import { store } from '$lib/store';
	import { onMount } from 'svelte'; // Import onMount

	function signout() {
		localStorage.removeItem('user');
		store.update((state) => ({ ...state, user: null }));
	}

	let isMobileMenuOpen = false; // Keep track of mobile menu state

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	// Close the mobile menu when the route changes (user navigates)
	$: $page.url && (isMobileMenuOpen = false);
</script>

<nav class="navbar">
	<div class="navbar-container">
		<a class="navbar-brand" href="/">
			<i class="fa fa-signal" />
			<span class="brand-text">Početna</span>
		</a>

		<!-- Mobile Menu Toggle -->
		<button
			class="navbar-toggler"
			type="button"
			aria-label="Toggle navigation"
			on:click={toggleMobileMenu}
		>
			<span class="navbar-toggler-icon" />
		</button>

		<div class="navbar-links" class:open={isMobileMenuOpen}>
			<ul class="nav-list">
				<li class="nav-item">
					<a href="/isps" class="nav-link" class:active={$page.route.id === '/isps'}>ISP</a>
				</li>
				<li class="nav-item">
					<a href="/customers" class="nav-link" class:active={$page.route.id === '/customers'}
						>Korisnici</a
					>
				</li>
				<li class="nav-item">
					<a
						href="/payment-slips"
						class="nav-link"
						class:active={$page.route.id?.includes('payment-slips')}>Uplatnice</a
					>
				</li>
				<li class="nav-item">
					<a href="/signin" class="nav-link signout-link" on:click|preventDefault={signout}
						>Odjava</a
					>
				</li>
			</ul>

			<div class="navbar-logo">
				<img src="/img/logo.png" alt="Logo" class="logo-img" />
			</div>
		</div>
	</div>
</nav>

<style>
	.navbar {
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 1rem 2rem; /* Increased padding */
		position: fixed; /* Keep fixed positioning */
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100; /* High z-index to ensure it's on top */
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; /*macOS font*/
	}

	.navbar-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px; /* Limit maximum width */
		margin: 0 auto; /* Center the container */
		width: 100%;
	}

	.navbar-brand {
		display: flex;
		align-items: center;
		color: #333;
		font-size: 1.25rem; /* Larger font size */
		font-weight: 600;
		text-decoration: none; /* Remove underline */
		margin-right: 2rem; /* Add spacing between logo and nav */
	}

	.brand-text {
		margin-left: 0.5rem;
	}

	.navbar-links {
		display: flex; /* Use flexbox for alignment */
		align-items: center; /* Vertically center items */
		gap: 2rem; /* Add space between nav items and logo */
		flex-grow: 1; /* Allow navbar links to take available space*/
		justify-content: space-between;
	}

	.nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 1.5rem; /* Consistent spacing */
	}

	.nav-link {
		color: #555;
		text-decoration: none;
		padding: 0.5rem 0.75rem; /* Padding for better click targets */
		border-radius: 4px;
		transition: background-color 0.2s ease, color 0.2s ease;
		display: block; /* For consistent padding */
	}

	.nav-link:hover,
	.nav-link:focus {
		background-color: rgba(0, 122, 255, 0.1); /* macOS-style blue hover */
		color: #007aff;
		outline: none; /* Remove default focus outline */
	}

	.active {
		font-weight: 600;
		color: #007aff; /* Active link color */
	}

	.signout-link {
		color: #ff3b30; /* Red color for signout */
	}
	.signout-link:hover,
	.signout-link:focus {
		color: #ff3b30; /* Red color for signout */
		background-color: rgba(255, 59, 48, 0.1);
	}

	.navbar-logo {
		/* No explicit styles needed here, as we're styling the image */
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
	}

	.logo-img {
		width: 150px;
		border-radius: 8px; /* Slightly rounded corners */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Mobile Styles */
	.navbar-toggler {
		display: none; /* Hide by default */
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		margin-right: 1rem;
	}

	.navbar-toggler-icon {
		display: block;
		width: 25px;
		height: 3px;
		background-color: #333;
		margin: 5px 0;
		transition: all 0.2s ease-in-out;
		border-radius: 2px;
	}
	/* Hamburger animation */
	.navbar-toggler:focus {
		outline: none;
	}

	.open .navbar-toggler-icon:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}
	.open .navbar-toggler-icon:nth-child(2) {
		opacity: 0;
	}
	.open .navbar-toggler-icon:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	@media (max-width: 768px) {
		.navbar-links {
			display: none; /* Hide by default on mobile */
			flex-direction: column; /* Stack items vertically */
			position: absolute; /* Position absolutely */
			top: 64px; /* Position below the navbar (adjust as needed)*/
			left: 0;
			width: 100%;
			background-color: #fff;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a shadow */
			padding: 1rem 0;
			z-index: 99;
		}
		.navbar-links.open {
			display: flex;
		}

		.nav-list {
			flex-direction: column; /* Stack items vertically */
			align-items: stretch; /* Stretch items to full width */
			gap: 0;
		}

		.nav-item {
			width: 100%; /* Full width */
		}

		.nav-link {
			padding: 0.75rem 1rem;
			text-align: left; /* Align text to the left */
			border-bottom: 1px solid rgba(0, 0, 0, 0.05); /*Subtle divider*/
		}
		.navbar-brand {
			margin-right: 0;
		}

		.navbar-toggler {
			display: block; /* Show on mobile */
		}
		.navbar-logo {
			display: none; /*Hide logo on mobile*/
		}
		.navbar {
			padding: 0.5rem 1rem;
		}
	}
	@media (max-width: 480px) {
		.navbar-brand {
			font-size: 1rem;
		}
	}
</style>
