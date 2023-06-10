import { useState } from 'react';


import { Form, Input, Label, Button } from './ContactForm.module';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');



const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    };
  };

  
const onFormSubmit = event => {
    event.preventDefault();
   
    addContact({ name, number });

    setName('');
    setNumber('');

  };



  return (
    <Form onSubmit={onFormSubmit} autoComplete="off">
      <Label>
        NAME
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder='Enter Name...'
          value={name}
          onChange={onInputChange}
        />
      </Label>
      <Label>
        NUMBER
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter number..."
          value={number}
          onChange={onInputChange}
        />
      </Label>
      <Button
        type="submit"
        disabled={!name && !number}>
        Add
      </Button>
    </Form>
  );
};