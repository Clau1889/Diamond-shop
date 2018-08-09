paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'neoma03_obelix-buyer@hotmail.com'
    },
    // Customize button (optional)
    locale: 'en_MX',
    style: {
      size: 'small',
      color: 'black',
      shape: 'pill',
    },
    // Set up a payment
    payment: function (data, actions) {
      return actions.payment.create({
        transactions: [{
          amount: {
            total: '10.00',
            currency: 'MX'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(function () {
          // Show a confirmation message to the buyer
          window.alert('Thanks for your purchase!');
        });
    }
  }, '#paypal-button');