import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';

// GraphQL query to get all tags with counts
const GET_ALL_TAGS = gql`
  query GetAllTags {
    tags(first: 100, where: { hideEmpty: true }) {
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

interface Tag {
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

export default function TagsIndex() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const result = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(GET_ALL_TAGS) }),
        });
        const json = await result.json();

        if (json.errors) {
          console.error('GraphQL Errors:', json.errors);
          setError(`GraphQL Error: ${json.errors[0]?.message || 'Unknown error'}`);
          return;
        }

        const fetchedTags = json.data?.tags?.edges?.map((edge: any) => edge.node) || [];
        setTags(fetchedTags);

      } catch (err) {
        console.error('Error fetching tags:', err);
        setError('Failed to load tags. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-brand mx-auto mb-4"></div>
          <p className="text-gray-text font-medium">Loading tags...</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Article Tags</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover insights by browsing our collection of tags and topics.
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
              <span className="text-gray-500">Tags</span>
            </nav>
          </div>

          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/insights/tag/${tag.slug}`}
                  className="bg-white border border-gray-border rounded-full px-6 py-3 hover:shadow-lg hover:bg-green-light transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-navy font-semibold">{tag.name}</span>
                  <span className="bg-green-brand text-white text-xs font-bold px-2 py-1 rounded-full">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-border">
              <p className="text-gray-500 font-medium text-lg">No tags found.</p>
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