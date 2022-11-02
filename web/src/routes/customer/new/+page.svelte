<script lang="ts">
	import { goto } from "$app/navigation";
	import Form from "$lib/components/customer/new.svelte";
	import { createCustomer } from "$lib/services";

    function submit(isp: any): any {
        return () => {
            createCustomer(isp).then(data => {
                goto(`/customer`)
            });
        }
    }

</script>

<div>
    <Form {submit} />
</div>