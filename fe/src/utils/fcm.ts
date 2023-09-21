import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging';
import { onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// export const requestPermission = () => {
//   console.log('Requesting User Permission......');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification User Permission Granted.');
//       return getToken(messaging, {
//         vapidKey: import.meta.env.VITE_VAPID_KEY,
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log('Client Token: ', currentToken); // FCM 등록 토큰 => 서버 전송
//           } else {
//             console.log('Failed to generate the app registration token.');
//           }
//         })
//         .catch((err) => {
//           console.log(
//             'An error occurred when requesting to receive the token.',
//             err,
//           );
//         });
//     } else {
//       console.log('User Permission Denied.');
//     }
//   });
// };

onMessage(messaging, (payload) => {
  console.log('onMessage테스트중', payload);
  // ...
});
