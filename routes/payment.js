// const cors = require('cors');
// const router = require('express').Router();
// const express = require('express') 
// const stripe = require("stripe")("sk_test_51Hgsw1F8G2AFQqZa9XazxDUVREfCbiII6kIeUXUfxvgRoVbqBZqPgO3eBoe2Qv8lyfMXKJOKMdes0tZXVFRGWqmU00ffVrykWe");
// const uuid = require('uuid').v4

// const app = express();

// app.use(express.json())
// app.use(cors());

// // app.get("/", (req, res) => {
// //   res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// // });

// router.post("/checkout", async (req, res) => {

//     // console.log('back end')
//     // console.log("Request:", req.body);

//   let error;
//   let status;
//   try {
//     const { product, token } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id
//     });
//     console.log(customer);

//     const idempotencyKey = uuid();
//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: "usd",
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `Purchased the ${product.name}`,
//         shipping: {
//           name: token.card.name,
//           address: {
//             line1: token.card.address_line1,
//             line2: token.card.address_line2,
//             city: token.card.address_city,
//             country: token.card.address_country,
//             postal_code: token.card.address_zip
//           }
//         }
//       },
//       {
//         idempotencyKey
//       }
//     );
//     console.log("Charge:", { charge });
//     status = "success";
//   } catch (error) {
//     console.error("Error:", error);
//     status = "failure";
//   }

//   res.json({ error, status });
// });

// module.exports = router;


const cors = require("cors");
const router = require('express').Router();
const express = require("express");
const stripe = require("stripe")("sk_test_51Hgsw1F8G2AFQqZa9XazxDUVREfCbiII6kIeUXUfxvgRoVbqBZqPgO3eBoe2Qv8lyfMXKJOKMdes0tZXVFRGWqmU00ffVrykWe");
const uuid = require('uuid').v4

// const app = express();

router.use(express.json());
router.use(cors());

// app.get("/", (req, res) => {
//   res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// });

router.post("/checkout", async (req, res) => {
    console.log("EEROR IS ON THIS -> Request:", req.body.product.name);
  

  let error;
  let status;
  try {
    const { token, product } = req.body;
    // console.log("Request:", product.price*100);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = router;