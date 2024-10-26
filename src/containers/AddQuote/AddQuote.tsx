import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory, IQuote } from '../../types';
import axiosApi from '../../AxiosAPI.ts';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await axiosApi.post('/quotes.json', quote);
    } catch (error) {
      console.error('Error awaiting data:',error);
    }finally {
      navigate('/');
    }
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <h3>Add Quote</h3>
      <select
        required
        value={quote.category}
        onChange={e => setQuote({ ...quote, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((category: ICategory) => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Author"
        required
        value={quote.author}
        onChange={e => setQuote({ ...quote, author: e.target.value })}
      />
      <textarea
        placeholder="Quote text"
        required
        value={quote.text}
        onChange={e => setQuote({ ...quote, text: e.target.value })}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddQuote;
