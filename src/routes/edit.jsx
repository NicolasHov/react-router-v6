import { useState } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact, getContact } from "../contacts.js";
import { verbs, conjunctions, famousNames } from "../../assets/words.js"
import { useEffect } from "react"

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  console.log(contact);
  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

const getRandomNumber = (N) => Math.floor(Math.random() * (N + 1));

export default function EditContact() {
    const { contact } = useLoaderData(); 

    const [verb, setVerb] =               useState(contact.verb ? contact.verb : "Click me")
    const [conjunction, setConjunction] = useState(contact.conjunction ? contact.conjunction : "Click me")
    const [name, setName] =               useState(contact.name ? contact.name : "Click me")

  const navigate = useNavigate();


//   useEffect(() => {
    
//   }, [])

  return (
    <Form method="post" id="contact-form">
      <div>
        <label>
          <span>Generate</span>
          <div id="inputLikeArea">
          <div 
            className="inputLike" 
            onClick={() => setVerb(verbs[getRandomNumber(verbs.length)])}>
            {verb}
          </div>
          <div 
            className="inputLike" 
            onClick={() => setConjunction(conjunctions[getRandomNumber(conjunctions.length)])}>
            {conjunction}
          </div>
          <div 
            className="inputLike" 
            onClick={() => setName(famousNames[getRandomNumber(famousNames.length)])}>
            {name}
          </div>
            </div>
        </label>
      </div>
      <label>
        <span>Mastodon</span>
        <input
          type="text"
          name="mastodon"
          placeholder="@jack"
          defaultValue={contact.mastodon}
        />
      </label>
      <label>
        <span>Image URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Publish</button>
        <button
          type="button"
          onClick={() => {
            contact.verb = verb
            contact.conjunction = conjunction
            contact.famousNames = name
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
