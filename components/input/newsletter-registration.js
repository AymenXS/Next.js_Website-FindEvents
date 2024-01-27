import { useRef } from 'react';
import styles from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInput = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const populatedEmail = emailInput.current.value;

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: populatedEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
