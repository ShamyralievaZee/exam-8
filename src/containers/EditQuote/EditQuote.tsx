import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditQuote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<Omit<IQuote, 'id'>>({ category: '', author: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axiosApi.get<IQuote>(`/quotes/${id}.json`);
        setQuote({ category: response.data.category, author: response.data.author, text: response.data.text });
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };
    void fetchQuote();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuote(prevQuote => ({ ...prevQuote, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosApi.put(`/quotes/${id}.json`, quote);
    } catch (error) {
      console.error('Error updating quote:', error);
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
      title="Edit Quote"
      buttonText="Edit"
    />
  );
};

export default EditQuote;
