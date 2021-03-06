const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key

sgMail.setApiKey(SENDGRID_API_KEY);
const sendM = (op, to) => {
  sgMail.send(op).then(() => console.log('Email sent', to)).catch(err => {
    console.error(err, op)
    if (err.response) {
      const { message, code, response } = err
      const { headers, body } = err
      console.error(body, to)
    }
    return null
  })
}
exports.sendNewPostMail = functions.database.ref('posts/{cat}/{pid}').onCreate((doc, context) => {
  const post = doc.val();
  const cat = context.params.cat;
  const url = `https://regwrites.ga/read?ref=posts/${cat}/${context.params.pid}`;
  const htmlTemp = (email) => ` <!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${post.title}</title> <script src="https://kit.fontawesome.com/3cdd729c01.js" crossorigin="anonymous"></script> <style>*, *:before, *::after{margin: 0; padding: 0; text-decoration: none; box-sizing: border-box;}body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}.hello{text-align: center; font-size: 20px;}.logo{width: 40%; display: block; margin: 10px auto;}.title{background: #eee; font-weight: bolder; color: transparent; padding: 5px 15px; text-align: center; text-transform: uppercase;}.title h2{color: #70a}.goLink{display: block; padding: 10px; margin: 10px; background: linear-gradient(to right bottom, #70a, #f20); color: white; text-transform: uppercase; font-weight: bolder; text-align: center;}.topic{font-size: 25px; margin-bottom: 15px; text-transform: capitalize; text-align: center;}.poem{margin-bottom: 100px;}.bg{width: 100%; height: 200px; object-fit: cover; z-index: -1;}.content{z-index: 1000; position: relative; line-height: 1.4; background: #fff; box-shadow: 0 10px 20px rgba(0, 0, 0, .2); border: 1px solid #ddd; margin: -80px 10px 0 10px; padding: 20px;}.content p{margin-bottom: 0px;}.inmage{width: 100%; margin-top: 20px;}footer{padding: 10px; color: #fff; background: linear-gradient(to right bottom, #70a, #f20);}footer h4{text-align: center; color: #fe0; text-transform: capitalize;}footer .buttons{display: flex; align-items: center; justify-content: center;}.buttons a{color: #fff; font-size: 30px; display: inline-block; margin: 0 15px;}</style></head><body> <h1 class="hello">Hello ${email.split('@')[0]}</h1> <img class="logo" src="https://regwrites.now.sh/logo.png" alt=""/> <div class="title"> <h2>A new post from Regwrites</h2> </div><div class="poem"> <img class="bg" src="${post.src}"/> <article class="content"> <h1 class="topic">${post.title}</h1> <a href="${url}" class="goLink">Go to post</a> ${post.body.substring(0, 600)}<a href="${url}">..Read more</a> <img src="${post.src}" class="inmage"/> <h4>Category : ${cat}</h4> </article> </div><!-- <footer> <h4>Follow me</h4> <div class="buttons"> <a href="facebook.com"> <i class="fa fa-facebook"></i> </a> <a href="facebook.com"> <i class="fa fa-instagram"></i> </a> <a href="facebook.com"> <i class="fa fa-twitter"></i> </a> </div></footer> --></body></html> `;
  const mailOptions = {
    to: "odunmilade@gmail.com",
    from: '"Regina B. from Regwrites" <regshow@regwrites.ga> ',
    subject: 'A new post from Regwrites :' + post.title,
    text: 'This is the text from regwrites'
  };

  admin.database().ref('subscribers/').once('value', s => {
    for (let keys in s.val()) {
      mailOptions.to = s.val()[keys]
      mailOptions.html = htmlTemp(s.val()[keys])
      sendM(mailOptions, s.val()[keys])
      // sendMails(mailOptions)
    }
  })
  return null
})

exports.sendSubscriptionSuccess = functions.database.ref('subscribers/{id}').onCreate((doc, context) => {
  const email = doc.val();
  const mailOptions = {
    to: email,
    from: '"Regina B. from Regwrites" <regshow@regwrites.ga> ',
    subject: 'Thanks for subscribing to Regwrites',
    text: 'Thanks for subscribing',
    html: `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">  <style>*, *:before, *::after{margin: 0; padding: 0; text-decoration: none; box-sizing: border-box;}body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}.hello{text-align: center; font-size: 20px;}.logo{width: 40%; display: block; margin: 10px auto;}.title{background: #eee; font-weight: bolder; color: transparent; padding: 5px 15px; text-align: center; text-transform: uppercase;}.title h2{color: #70a}.goLink{display: block; padding: 10px; margin: 10px; background: linear-gradient(to right bottom, #70a, #f20); color: white; text-transform: uppercase; font-weight: bolder; text-align: center;}.topic{font-size: 25px; margin-bottom: 15px; text-transform: capitalize; text-align: center;}.poem{margin-bottom: 100px;}.bg{width: 100%; height: 200px; object-fit: cover; z-index: -1;}.content{z-index: 1000; position: relative; line-height: 1.4; background: #fff; box-shadow: 0 10px 20px rgba(0, 0, 0, .2); border: 1px solid #ddd; margin: 10px; padding: 20px;}.content p{margin-bottom: 10px;}.inmage{width: 100%; margin-top: 20px;}footer{padding: 10px; color: #fff; background: linear-gradient(to right bottom, #70a, #f20);}footer h4{text-align: center; color: #fe0; text-transform: capitalize;}footer .buttons{display: flex; align-items: center; justify-content: center;}.buttons a{color: #fff; font-size: 30px; display: inline-block; margin: 0 15px;}</style></head><body> <h1 class="hello">Dear ${email.split('@')[0]}</h1> <img class="logo" src="https://regwrites.now.sh/logo.png" alt="logo"/> <div class="title"> <h2>Thanks for subscribing </h2> </div><div class="poem"> <article class="content"> <p> To enjoy more articles on regwrites, click the link below. You will be glad you did. </p><a class="goLink" href="https://regwrites.now.sh">Open site</a> <p>To unsubscribe from Reg Writes , click the button below</p><a class="goLink" href="https://regwrites.now.sh/u?email=${email}">Unsubscribe</a> </article> </div><!-- <footer> <h4>Follow me</h4> <div class="buttons"> <a href="facebook.com"> <i class="fa fa-facebook"></i> </a> <a href="facebook.com"> <i class="fa fa-instagram"></i> </a> <a href="facebook.com"> <i class="fa fa-twitter"></i> </a> </div></footer> --></body></html>`
  };
  return sendM(mailOptions, email)

})