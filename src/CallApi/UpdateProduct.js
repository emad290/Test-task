import { pasUrl } from "@/const/PasUrl";


export default async function UpdateProduct(values){

const res = await fetch(`${pasUrl}/test_api/products/update_product.php`,{
    method:"POST",
    body:JSON.stringify(values)

});
const data = await res.json();
return data

}