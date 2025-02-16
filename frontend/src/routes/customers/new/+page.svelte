<script lang="ts">
	import { goto } from "$app/navigation";
	import Form from "../components/new.svelte";
	import { createCustomer } from "$lib/services";

    function submit(isp: any): any {
        return () => {
            createCustomer(isp).then(data => {
                goto(`/customers`)
            });
        }
    }

</script>

<div>
    <Form {submit} />
</div>