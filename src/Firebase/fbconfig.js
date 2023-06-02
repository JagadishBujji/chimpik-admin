// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // apiKey: 'AIzaSyBuBXCOdDiNymq-xAtUVj4uimxpPWGq1Tw',
  // authDomain: 'kangruphoto-edd11.firebaseapp.com',
  // databaseURL: 'https://kangruphoto-edd11-default-rtdb.firebaseio.com',
  // projectId: 'kangruphoto-edd11',
  // storageBucket: 'kangruphoto-edd11.appspot.com',
  // messagingSenderId: '351038069759',
  // appId: '1:351038069759:web:21c266a478b6132046e5ca',
  // measurementId: 'G-FFKCFXRPXE',
  apiKey: 'AIzaSyCfRq9eZBMahHPISRpHHkplWyOpb9xzD4M',
  authDomain: 'photojams-634b5.firebaseapp.com',
  databaseURL: 'https://photojams-634b5-default-rtdb.firebaseio.com',
  projectId: 'photojams-634b5',
  storageBucket: 'photojams-634b5.appspot.com',
  messagingSenderId: '885904754428',
  appId: '1:885904754428:web:09af02402434913b09b979',
  measurementId: 'G-TE5HRPBD3Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default app;
export { db, analytics };
