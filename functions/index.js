const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.fcmSend = functions.database
  .ref('/messages/{userId}/{messageId}')
  .onCreate(event => {
  const message = event.data.val();
    const userId = event.params.userId;
    const payload = {
      notification: {
        title: '¡Tienes un nuevo mensaje!',
        body: message.message,
        icon: message.picture,
        type: message.type,
        friend_uid: message.friend_uid,
        friend_name: message.friend_name,
        timestamp: message.timestamp
      }
    };
    admin.database()
      .ref('/fcmTokens/' + message.friend_uid)
      .once('value')
      .then(token => token.val())
    .then(userFcmToken => {
      return admin.messaging().sendToDevice(userFcmToken, payload);
    })
    .then(res => {
      console.log('Sent Succusfully', payload);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
});
