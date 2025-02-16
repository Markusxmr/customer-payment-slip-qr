<script lang="ts">
	import { goto } from "$app/navigation";
	import Form from "../components/new.svelte";
	import { createIsp} from "$lib/services";

    function submit(isp: any) {
        return () => {
            createIsp(isp).then(data => {
                goto(`/isps`)
            });
        }
    }
</script>

<div>
    <Form {submit} />
</div>