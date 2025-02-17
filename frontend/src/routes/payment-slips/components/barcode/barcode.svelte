<script lang="ts">
	import { FormatIntegerToDecimal } from '$lib/Format';
	import { onMount } from 'svelte';
	import PDF417 from '$lib/pdf417';

	let canvas: HTMLCanvasElement;
	export let canvasClass = 'uplatnica__barcode';
	export let key = 0;
	export let props: any;
	export let hub3_code = `HRVHUB30
EUR
000000000012355
ZELJKO SENEKOVIC
IVANECKA ULICA 125
42000 letAZDIN
2DBK d.d.
ALKARSKI PROLAZ 13B
21230 SINJ
HR1210010051863000160
HR01
7269-68949637676-00019
COST
Troskovi za 1. mjesec`;

	$: if (props) {
		hub3_code = `HRVHUB30
${props?.valuta_placanja}
${FormatIntegerToDecimal(props?.iznos, { dot: true })}
${props?.ime_i_prezime_platitelja}
${props?.ulica_i_broj_platitelja}
${props?.postanski_i_grad_platitelja}
${props?.naziv_primatelja}
${props?.ulica_i_broj_primatelja}
${props?.postanski_i_grad_primatelja}
${props?.iban_primatelja}
${props?.model_primatelja}
${props?.poziv_na_broj_primatelja}
${props?.sifra_namjene}
${props?.opis_placanja}`;
	}

	$: if (hub3_code && canvas) {
		generate();
	}

	onMount(() => {
		PDF417.init(hub3_code);

		let barcode = PDF417.getBarcodeArray();

		// block sizes (width and height) in pixels
		let bw = 2;
		let bh = 2;

		canvas.width = bw * barcode['num_cols'];
		canvas.height = bh * barcode['num_rows'];
		document.getElementById(`barcode-${key}`).appendChild(canvas);

		let ctx = canvas.getContext('2d');

		// graph barcode elements
		let y = 0;
		// for each row
		for (let r = 0; r < barcode['num_rows']; ++r) {
			let x = 0;
			// for each column
			for (let c = 0; c < barcode['num_cols']; ++c) {
				if (barcode['bcode'][r][c] == 1) {
					ctx.fillRect(x, y, bw, bh);
				}
				x += bw;
			}
			y += bh;
		}
	});

	function generate() {
		PDF417.init(hub3_code);

		let barcode = PDF417.getBarcodeArray();

		// block sizes (width and height) in pixels
		let bw = 2;
		let bh = 2;

		canvas.width = bw * barcode['num_cols'];
		canvas.height = bh * barcode['num_rows'];

		let ctx = canvas.getContext('2d');

		// graph barcode elements
		let y = 0;
		// for each row
		for (let r = 0; r < barcode['num_rows']; ++r) {
			let x = 0;
			// for each column
			for (let c = 0; c < barcode['num_cols']; ++c) {
				if (barcode['bcode'][r][c] == 1) {
					ctx.fillRect(x, y, bw, bh);
				}
				x += bw;
			}
			y += bh;
		}
	}
</script>

<div id="barcode-{key}" />
<canvas bind:this={canvas} class={canvasClass} />
