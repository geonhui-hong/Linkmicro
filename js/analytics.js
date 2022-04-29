// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getAnalytics,
  logEvent,
  setUserId,
  setUserProperties,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0ISknll3vxRdY0maY_3l4NHH-2Zlcp-I",
  authDomain: "link-product-site.firebaseapp.com",
  projectId: "link-product-site",
  storageBucket: "link-product-site.appspot.com",
  messagingSenderId: "755987766812",
  appId: "1:755987766812:web:55eed604d1de423fea09d9",
  measurementId: "G-0NBZG19SR6"
};
// for dev test
// const firebaseConfig = {
//   apiKey: "AIzaSyDHc4Z6q8q685vFobcU8o00bXmHwPWgSoE",
//   authDomain: "link-1271f.firebaseapp.com",
//   projectId: "link-1271f",
//   storageBucket: "link-1271f.appspot.com",
//   messagingSenderId: "520189079247",
//   appId: "1:520189079247:web:72575f4ec85234365111ba",
//   measurementId: "G-NN5TRDTBSW"
// };

class MRXAnalytics {
  logging = true;
  enabled = true;
  _analytics = null;

  initialize(debug = true) {
    // const firebaseConfig = debug ? debugFirebaseConfig : releaseFirebaseConfig;
    if (!this._analytics) {
      if (this.logging) {
        console.debug("MRXAnalytics initialize debug:" + debug);
      }
      if (this.enabled) {
        const app = initializeApp(firebaseConfig);
        this._analytics = getAnalytics(app);
        }
    }
  }

  sendEvent(eventName, eventParams) {
    if (this._analytics) {
      if (this.logging) {
        console.debug("sendEvent", eventName, eventParams);
      }
      if (this.enabled) {
        logEvent(this._analytics, eventName, eventParams);
      }
    }
  }

  setUserId(id) {
    if (this._analytics) {
      if (this.logging) {
        console.debug("setUserId", id);
      }
      if (this.enabled) {
        setUserId(this._analytics, id);
      }
    }
  }

  setUserProperties(properties) {
    if (this._analytics) {
      if (this.logging) {
        console.debug("setUserProperties", properties);
      }
      if (this.enabled) {
        setUserProperties(this._analytics, properties);
      }
    }
  }

  screenView(screenName) {
    if (this._analytics) {
      if (this.logging) {
        console.debug("screenView", screenName);
      }
      if (this.enabled) {
        logEvent(this._analytics, 'screen_view', {
          firebase_screen: screenName
        });
      }
    }
  }
}

if (!window.MRXAnalytics) {
  window.MRXAnalytics = new MRXAnalytics();
  window.MRXAnalytics.initialize();
}

export default window.MRXAnalytics;
