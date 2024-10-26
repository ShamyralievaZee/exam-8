import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosApi from '../../AxiosAPI.ts';
import {ICategory, IQuote } from '../../types';
import Spinner from '../../UI/Spinner/Spinner.tsx';

const categories: ICategory[] = [
  { title: 'All', id: 'all' },
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous People', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' },
];

const QuotesList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuotes = async ():Promise<void> => {
      try {
        setLoading(true);
        const categoryQuery = category && category !== 'all' ? `orderBy="category"&equalTo="${category}"` : '';
        const response = await axiosApi.get<Record<string, Omit<IQuote, 'id'>>>(
          `/quotes.json?${categoryQuery}`
        );

        const loadedQuotes: IQuote[] = response.data
          ? Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          })).reverse()
          : [];


        setQuotes(loadedQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchQuotes();
  }, [category]);

  const handleDelete = async (id: string) => {
    await axiosApi.delete(`/quotes/${id}.json`);
    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id));
  };

  return (
    <div className="container quotes-list">
      <div className='category-sidebar'>
        <h4 className='page-title'>Categories</h4>
        <ul className='category-list'>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={category.id === 'all' ? '/' : `/quotes/${category.id}`}>{category.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="quotes-container">
        <h4 className="page-title">Quotes</h4>
        {loading ? (
          <Spinner/>
        ) : quotes.length > 0 ? (
          quotes.map((quote) => (
            <div key={quote.id} className="single-quote">
              <p className='single-quote-text' >“{quote.text}“</p>
              <p className='single-quote-author'> - {quote.author}</p>
              <Link to={`/quotes/${quote.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(quote.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No quotes yet</p>
        )}
      </div>
    </div>
  );
};

export default QuotesList;
