import { NextPage } from "next";
import { useEffect } from "react";
import { getAuth, getRedirectResult, TwitterAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Callback: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then(async result => {
        if (result) {
          const user = result.user;
          const credential = TwitterAuthProvider.credentialFromResult(result);

          const db = getFirestore();
          const docRef = doc(db, "tokens", user.uid);

          await setDoc(docRef, {
            accessToken: credential?.accessToken,
            accessTokenSecret: credential?.secret,
          });
        }
      })
      .catch(error => {});

    router.push("/new");
  }, []);

  return <>Redirecting...</>;
};

export default Callback;
