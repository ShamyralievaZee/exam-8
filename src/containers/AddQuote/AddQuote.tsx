import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory, IQuote } from '../../types';
import axiosApi from '../../AxiosAPI.ts';
import categories from '../../categories.ts';

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
    <form className='container form-box' onSubmit={handleSubmit}>
      <h3 className='page-title'>Add Quote</h3>

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
        placeholder="Author name"
        required
        value={quote.author}
        onChange={e => setQuote({ ...quote, author: e.target.value })}
      />
      <textarea
        placeholder="Write your quote here"
        required
        value={quote.text}
        onChange={e => setQuote({ ...quote, text: e.target.value })}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddQuote;
