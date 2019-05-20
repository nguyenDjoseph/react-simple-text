import React, { useState } from 'react';
import './SMSForm.css';

const SMSForm = () => {
  const [message, setMessage] = useState({
    to: '',
    body: ''
  });
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setInitialValues = () => {
    setMessage({to: '', body: ''});
    setError(false);
    setSubmitting(false);
  }

  const onHandleChange = e => {
    const name = e.target.getAttribute('name');
    setMessage({...message, [name]: e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    fetch("http://localhost:3001/api/messages", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          setInitialValues();
        }
        else {
          setError(true);
          setSubmitting(false);
        }
      })
  }


       return (
        <div> 
        <form 
          onSubmit={onSubmit}
          className={error ? 'error sms-form' : 'sms-form'}>
          <div>
            <label htmlFor="to">To:</label>
            <input
              type="tel"
              name="to"
              id="to"
              value={message.to}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="body">Body:</label>
            <textarea 
              name="body" 
              id="body"
              value={message.body}
              onChange={onHandleChange}
            />
          </div>
          <button type="submit" disabled={submitting}>
            Send message
          </button>
        </form>
        </div>
      )
}
export default SMSForm;