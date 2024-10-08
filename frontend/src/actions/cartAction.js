import axios from "axios";
import{
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    UPDATE_DELIVERY_INFO,
    SAVE_DELIVERY_INFO
}from "../constants/cartConstant";

export const addItemToCart=(id,quantity)=>async(dispatch,getState)=>{
    try{
        const {data}=await axios.get(`/api/v1/eats/item/${id}`);
        console.log("fooditem",data)
        const fooditemData=data.data;
        const image=fooditemData.images && fooditemData.images.length>0
        ? fooditemData.images[0].url:"";
        dispatch({
            type:ADD_TO_CART,
            payload:{
                fooditem:fooditemData._id,
                name:fooditemData.name,
                price:fooditemData.price,
                image,
                stock:fooditemData.stock,
                quantity, 
            },
        });
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    }catch(error){
        alert.error("Failed to add item to cart.Please try again")
    }
}

export const updateCartQuantity=
 (fooditemId,quantity)=>async(dispatch)=>{
    dispatch({
        type:UPDATE_CART_QUANTITY,
        payload:{ fooditemId,quantity},
    });
 };

 export const removeItemFromCart =(id)=>async(dispatch,getState)=>{
    dispatch({
        type:REMOVE_ITEM_CART,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
 } ;

 export const  clearCart=()=>(dispatch)=>{
    dispatch({
        type:CLEAR_CART
    });
    localStorage.removeItem("cartItems");
 };


export const saveDliveryInfo=(deliveryInfo)=>(dispatch,getState)=>{
    try{
        const existingDeliveryInfo=getState().cart.deliveryInfo;
        if(existingDeliveryInfo){
            dispatch({
                type:UPDATE_DELIVERY_INFO,payload:deliveryInfo
            })
        }else{
            dispatch({
                type:SAVE_DELIVERY_INFO,payload:deliveryInfo
            });
        }
    }catch(error){}
};

export const updateDeliveryInfo=(deliveryInfo)=>(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_DELIVERY_INFO,
            payload:deliveryInfo,
        });
    }catch(error){}
};