import React from "react";

const PaymentIntegration = () => {

    const paymentHandler = async (e) => {
        const API_URL = 'http://localhost:3000/';
        e.preventDefault();
        const orderUrl = `${API_URL}order`;
        const response = await Axios.get(orderUrl);
        const { data } = response;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_ID,
          name: "Payment Integration",
          description: "Project to test Payment Integration",
          order_id: process.env.REACT_APP_ORDER_ID,
        //   order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await Axios.post(url, {})
             console.log(captureResponse.data);
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        };

    return (
<button onClick={paymentHandler}>Pay Now</button>
    )
}

export default PaymentIntegration;