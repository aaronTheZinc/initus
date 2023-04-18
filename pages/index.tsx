import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef } from "react";
import useInitus from "../initus";

interface Character {
  firstName: string;
  lastName: string;
}

export default function Home() {
  const { link, read } = useInitus<Character>({
    autoSave: {
      save: console.log,
      debounce: 1000,
    },
  });
  const firstName = useRef<HTMLInputElement>();
  const lastName = useRef();

  useEffect(() => {
    link({
      key: "firstName",
      ref: firstName,
    });

    link({
      key: "lastName",
      ref: lastName,
    });
  }, []);

  function handleSubmit() {
    console.log("Collected Data: ", read());
  }

  return (
    <div className={styles.container}>
      <div>
        <input placeholder="First Name" ref={firstName} />
        <input placeholder="Last Name" ref={lastName} />
        <button onClick={handleSubmit}>Click</button>
      </div>
    </div>
  );
}
