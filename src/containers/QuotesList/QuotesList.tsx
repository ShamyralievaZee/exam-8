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
          }))
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

  return (
    <div className="container">
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
        {loading ? (
          <Spinner />
        ) : quotes.length > 0 ? (
          quotes.map((quote) => (
            <div key={quote.id} className="quote">
              <p>{quote.text}</p>
              <p>{quote.author}</p>
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
