import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gql } from '@apollo/client';

// GraphQL query to get all categories with counts
const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      edges {
        node {
          id
          name
          slug
          count
          description
        }
      }
    }
  }
`;

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
}

// Simple GraphQL query printer
const print = (query: any) => {
  if (typeof query === 'string') return query;
  return query.loc?.source?.body || '';
};

export default function CategoriesIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(GET_ALL_CATEGORIES) }),
        });
        const json = await result.json();

        if (json.errors) {
          console.error('GraphQL Errors:', json.errors);
          setError(`GraphQL Error: ${json.errors[0]?.message || 'Unknown error'}`);
          return;
        }

        const fetchedCategories = json.data?.categories?.edges?.map((edge: any) => edge.node) || [];
        setCategories(fetchedCategories);

      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-brand mx-auto mb-4"></div>
          <p className="text-gray-text font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-6 font-semibold">{error}</p>
          <Link to="/insights" className="bg-green-brand text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Article Categories</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Browse our insights by category to find the topics that interest you most.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-gray-pale">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-text">
              <Link to="/" className="hover:text-navy">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/insights" className="hover:text-navy">Insights</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-500">Categories</span>
            </nav>
          </div>

          {categories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/insights/category/${category.slug}`}
                  className="bg-white border border-gray-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-navy leading-tight flex-grow">
                      {category.name}
                    </h3>
                    <span className="bg-green-light text-green-brand text-sm font-semibold px-3 py-1 rounded-full ml-4">
                      {category.count}
                    </span>
                  </div>
                  {category.description && (
                    <p className="text-gray-text text-sm leading-relaxed mb-6 line-clamp-3">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-green-brand font-semibold text-sm">
                    View Articles <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-border">
              <p className="text-gray-500 font-medium text-lg">No categories found.</p>
              <Link to="/insights" className="mt-4 text-green-brand font-semibold hover:underline">
                Browse all insights
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}