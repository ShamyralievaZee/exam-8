import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory, IQuote } from '../../types';
import axiosApi from '../../AxiosAPI.ts';
import QuoteForm from '../../components/QuoteForm/QuoteForm.tsx';


const categories: ICategory[] = [
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous People', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' },
];

const AddQuote: React.FC = () => {
  const [quote, setQuote] = useState<Omit<IQuote, 'id'>>({ category: '', author: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuote(prevQuote => ({ ...prevQuote, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosApi.post('/quotes.json', quote);
    } catch (error) {
      console.error('Error adding quote:', error);
    } finally {
      navigate('/');
    }
  };

  return (
    <QuoteForm
      quote={quote}
      categories={categories}
      onChange={handleChange}
      onSubmit={handleSubmit}
      title="Add Quote"
      buttonText="Submit"
    />
  );
};

export default AddQuote;
