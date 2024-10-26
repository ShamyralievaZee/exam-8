import React from 'react';
import { ICategory, IQuote } from '../../types';

interface QuoteFormProps {
  quote: Omit<IQuote, 'id'>;
  categories: ICategory[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  buttonText: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ quote, categories, onChange, onSubmit, title, buttonText }) => {
  return (
    <form className='container form-box' onSubmit={onSubmit}>
      <h3 className='page-title'>{title}</h3>

      <select
        required
        name="category"
        value={quote.category}
        onChange={onChange}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </select>

      <input
        type="text"
        name="author"
        placeholder="Author name"
        required
        value={quote.author}
        onChange={onChange}
      />

      <textarea
        name="text"
        placeholder="Write your quote here"
        required
        value={quote.text}
        onChange={onChange}
      ></textarea>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default QuoteForm;
