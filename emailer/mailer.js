const mail = require('@sendgrid/mail');

exports.send = async data => {

    // sendgrid key for authentication
    // Hasintha's SG key
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    // Message to be sent to sendgrid for new email
    const msg = {
        to: data.email,
        from: 'test@example.com',
        subject: 'Welcome to PATRON',
        // text: data.name,
        // html: `<h3>${data.name}</h3>`,d-7c42beb2ea0a4b36ae431d3bd247135c
        template_id: 'd-7c42beb2ea0a4b36ae431d3bd247135c',
        dynamic_template_data: {
          name: data.name,
          email: 'patron.admin@patronlk',
          msg: 'The one platform to uphold the Sri Lankan lives!'
        }
      };

      await mail.send(msg)
        .then(resSG => {
          console.log('Sendgrid Email sent to: ', msg.to);
          return resSG;
        })
        .catch(err => {
          console.error('Sendgrid error: ', err);
          return err;
        });

}