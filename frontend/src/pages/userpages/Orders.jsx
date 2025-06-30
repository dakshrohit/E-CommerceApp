import React, {  useEffect, useState } from 'react'


const Orders = () => {
  const [orders,setOrders]=useState([])
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    // defined a func because useeffect callbacks cannot be async and we need to use async/await to fetch data
    
    
      const fetchedorderfromdb=async()=>{
        try{
        const res=await fetch("http://localhost:4000/orders/user",{
          credentials:"include" //to ensure cookies are sent with the request for authentication
        })
        const data=await res.json();

      
      if(res.ok){
        setOrders(data.orders);
      } else{
        console.error("Failed to fetch orders:", data.message || "Coudnt fetch orders from the server" ); // data.message: error message from the server
      }

    } catch(err){
      console.error("Error fetching orders:", err);

    } finally{
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  }
  
  // const result=fetchedorderfromdb(); // calling the async function to fetch orders from the server.the promise is pending until the data is fetched
  fetchedorderfromdb();
},
[] //this effect will run only once when the component mounts

)


return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={order._id || idx}
              className="bg-[#1A1A1A] border border-[#333] p-6 rounded shadow"
            >
              <div className="mb-2 flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Order ID: <span className="text-gray-300">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-blue-400 font-semibold uppercase">
                  {order.status || "Processing"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {order.products.map((prod) => (
                  <div
                    key={prod._id}
                    className="bg-[#2A2A2A] p-3 rounded flex items-center gap-4"
                  >
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{prod.title}</p>
                      <p className="text-sm text-gray-400">Qty: {prod.quantity}</p>
                      <p className="text-sm text-blue-400">
                        ₹{(prod.price * prod.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right text-lg font-semibold mt-4">
                Total: ₹{order.totalAmount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders
