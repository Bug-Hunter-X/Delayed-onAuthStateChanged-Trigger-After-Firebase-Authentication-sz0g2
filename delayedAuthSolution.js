Instead of directly relying on the `onAuthStateChanged` listener to immediately update the UI, wrap your authentication logic in a promise. The promise resolves only after the authentication state is successfully fetched, ensuring that subsequent actions are performed only after the state has been updated. This resolves the delay issue.

```javascript
function waitForAuth(){
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Authentication failed.'));
      }
    });
  });
}

waitForAuth().then(user => {
  // Access user data and proceed with app logic only after authentication.
  console.log('User authenticated:', user);
}).catch(error => {
  console.error('Authentication error:', error);
});
```