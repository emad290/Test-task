import { pasUrl } from "@/const/PasUrl"

export default async function AllProducts() {
    const res = await fetch(`${pasUrl}/test_api/products/read_products.php`);
    const data = await res.json();
    return data
}