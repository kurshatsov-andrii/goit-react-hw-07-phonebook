import { useDispatch, useSelector } from 'react-redux'; // для доступу до стору
import { useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { selectContacts, selectFilter } from 'redux/selectors';

import {
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations'; // операції
import { Button, Item, List, Text, Spinner } from './ContactList.styled';

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter], // масив селекторів
  (contacts, filter) => {
    // для кожного контакта переводимо його ім'я в нижній регістр
    // і перевіряємо чи воно включає в себе значення фільтра
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);


export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts); // витягуємо зі стору
  const isLoading = useSelector(selectIsLoading); // витягуємо зі стору
  const error = useSelector(selectError); // витягуємо зі стору
  const dispatch = useDispatch(); // для діспатча екшенів

  useEffect(() => {
    dispatch(fetchContacts()); // діспатчимо екшен
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id)); // діспатчимо екшен
  };

  return (
    <>
      {isLoading && <Spinner />}

      {/* якщо немає контактів і не йде загрузка і не виникла помилка */}
      {!filteredContacts?.length && !error && !isLoading && (
        <Text>No contacts found.</Text>
      )}

      {/* якщо виникла помилка */}
      {error && <Text>{error}</Text>}
      <List>

        {/* Перебираємо масив контактів і рендеримо їх */}
        {filteredContacts.map(({ id, name, phone }) => (
          <Item key={id}>            
            <Text>
              {name}: {phone}
            </Text>
            <Button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </Button>
          </Item>
        ))}
      </List>
    </>
  );
};