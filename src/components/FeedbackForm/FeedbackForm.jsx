// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./FeedbackForm.scss";

function FeedbackForm() {
  const [state, handleSubmit] = useForm("mjkyannj"); // your form ID from Formspree

  if (state.succeeded) {
    return <p className="submit-msg">Thank you for your feedback!</p>;
  }

  return (
    <form
      className="feedback-form"
      action="https://formspree.io/f/mjkyannj"
      method="POST"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" required />

      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" required />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="message">Feedback</label>
      <textarea id="message" name="message" required />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button className="submit-btn" type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

export default FeedbackForm;
