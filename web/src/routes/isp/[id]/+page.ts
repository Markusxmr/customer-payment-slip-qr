import { getIsp } from "$lib/services";

export async function load(event: any) {
    const params = event?.params;
    const id = event?.params?.id;
    const isp = await getIsp(id).catch(err => {
        throw err;
    });

    return {
        isp,
        params
    };
}