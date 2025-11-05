import { pasUrl } from "@/const/PasUrl";



export default async function AddProduct(values) {
    const res = await fetch(`${pasUrl}/test_api/products/create_product.php`,{
        method:"POST",
        body:JSON.stringify(values)
    })
    const data = await res.json();
    return data
}