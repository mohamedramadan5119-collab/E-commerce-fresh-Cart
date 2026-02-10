import React from "react";
import CheckoutForm from "../../_componants/checkoutform/checkoutform";

export default async function CheckOut({params}:{params:{cartid:string}}) {
  const {cartid} = await params
  console.log(cartid , 'sadjhgsa');
  
  return (
    <>
      <CheckoutForm cartId={cartid}></CheckoutForm>
    </>
  );
}
