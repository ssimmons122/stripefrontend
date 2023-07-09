import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";

function App() {

  const [product, setProduct] = useState({
    name: "Omnicient Plan",
    price: 25

  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`https://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("Response ", response)
      const {status} = response;
      console.log("Status ", status)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
          stripeKey= "pk_live_51NOVuVKkLuEJzlLF8L6k8f8rDaJgPDuiEEGRPUZnUbsEaJsMGMwiMJlYECqgPpZ04G4CKtmZskI6vDCGW78lMYGr00Ryb0Mvhn"
          token={makePayment}
          name="Buy a Plan" 
          amount={product.price * 100}
          >
          <button className="btn-large purple">Get your Plan now!</button>
          </StripeCheckout>
                
      </header>
    </div>
  );
}

export default App;
