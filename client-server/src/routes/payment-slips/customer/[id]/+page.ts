import { getCustomer } from "$lib/services";

export async function load(event: any) {
    const params = event?.params;
    const customer = await getCustomer(params);

    return {
        customer
    };
}