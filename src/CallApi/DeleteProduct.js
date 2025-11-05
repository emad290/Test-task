import { pasUrl } from "@/const/PasUrl";



export default async function DeleteProduct(product_id) {
    const res = await fetch(`${pasUrl}/test_api/products/delete_product.php`,{
        method:"POST",
        body:JSON.stringify({product_id})
    });
    const data = await res.json();
    return data
}