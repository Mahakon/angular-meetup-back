const db = require('../../../db/DataBase');

function addNewMessage({ userId, content }) {
  console.log('get ADD event' + content + userId);
  let message = {
    userId: userId,
    content: content
  };

  return db.addMessage(userId, content)
    .then(
      mesId => {
        message =  {
          ...message,
          id: mesId
        };

        return db.getUserData(userId)
      },
      err => {
        console.log(err);
        return err;
      }
    )
    .then(
      userData => {
        return {
          ...message,
          login: userData.login
        }
      }
    )
}

module.exports = addNewMessage;
