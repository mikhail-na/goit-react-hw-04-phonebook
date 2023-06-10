import React, {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { onLoadContact } from './LocalStorage/onLoadContact';
import { onSaveToLocalStorage } from './LocalStorage/onSaveToLocalStorage';

const LS_CONTACT = "ls-contact";

export const App = () => {

  const [contacts, setContacts] = useState(() => {
    return onLoadContact(LS_CONTACT) ?? [];
  });
  const [filter, setFilter] = useState('');


  useEffect(() => { 
    onSaveToLocalStorage(LS_CONTACT, contacts)
  }, [contacts])
  

  const addContactToContacts = contact => {
    const createContact = { id: nanoid(), ...contact};

    contacts.some(({ name }) => name.toLowerCase() === contact.name.toLowerCase())
      ? alert(`${contact.name.toLowerCase()} is already in your contacts`)
      : setContacts(() => [...contacts, createContact]); 
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter( value );
  };

  const getFilteredContacts = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normalized));
  };

  const removeContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id))
  };
  
  
  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContactToContacts} />
      </Section>
      <Section title="Contacts">
        <Filter
          value={filter}
          handleChangeFilter={handleChangeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          removeContact={removeContact}
        />
      </Section>
    </>
  );
};