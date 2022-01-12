import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";

export function useAnalytics() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDCxj8x06gPFUSSQ7Xik3FlpBd2SVWwPw0",
      authDomain: "pazink-lietuva.firebaseapp.com",
      projectId: "pazink-lietuva",
      storageBucket: "pazink-lietuva.appspot.com",
      messagingSenderId: "257665430842",
      appId: "1:257665430842:web:ed958ddde9b649ca7a8c03",
      measurementId: "G-M40LGQ1V86",
    };

    // Initialize Firebase

    if (process.env.NODE_ENV === "production") {
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    }
  }, []);
}
