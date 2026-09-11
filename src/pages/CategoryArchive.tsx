import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Search, Calendar } from 'lucide-react';
import { gql } from '@apollo/client';

// GraphQL queries
const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($slug: String!) {
    posts(first: 100, where: { categoryName: $slug, status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    edges: Array<{
      node: {
        name: string;
        slug: string;
      };
    }>;
  };
}

// Simple GraphQL query printer
const print = (query: any) => {
  if (typeof query === 'string') return query;
  return query.loc?.source?.body || '';
};

// Reusable components (copied from Insights.tsx for consistency)
const ArticleCard = ({ post, formatDate }: { post: Post; formatDate: (dateString: string) => string }) => (
  <article className="bg-white border border-gray-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
    <div className="w-full bg-gray-200 aspect-video flex items-center justify-center overflow-hidden">
      {post.featuredImage?.node?.sourceUrl ? (
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center text-gray-500">
          <Calendar size={32} className="mx-auto mb-2 opacity-20" />
          <p className="text-xs opacity-50">No image</p>
        </div>
      )}
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block text-green-light text-xs font-semibold uppercase tracking-wider">
          {post.categories.edges[0]?.node.name || 'Article'}
        </span>
      </div>
      <h3 className="text-lg font-bold text-navy mb-3 leading-snug flex-grow">
        {post.title}
      </h3>
      <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
        <Calendar size={14} className="text-gray-400" />
        {formatDate(post.date)}
      </div>
      <Link
        to={`/insights/${post.slug}`}
        className="inline-flex items-center gap-2 text-green-brand font-semibold text-sm hover:gap-3 transition-all mt-auto"
      >
        Read More <ArrowRight size={16} />
      </Link>
    </div>
  </article>
);

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-border rounded-lg font-medium text-gray-text hover:bg-gray-pale disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
            currentPage === page
              ? 'bg-green-brand text-white'
              : 'border border-gray-border text-gray-text hover:bg-gray-pale'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-border rounded-lg font-medium text-gray-text hover:bg-gray-pale disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default function CategoryArchive() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categorySlug) return;

      try {
        setLoading(true);
        const result = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: print(GET_POSTS_BY_CATEGORY),
            variables: { slug: categorySlug }
          }),
        });
        const json = await result.json();

        if (json.errors) {
          console.error('GraphQL Errors:', json.errors);
          setError(`GraphQL Error: ${json.errors[0]?.message || 'Unknown error'}`);
          return;
        }

        const fetchedPosts = json.data?.posts?.edges?.map((edge: any) => edge.node) || [];
        setPosts(fetchedPosts);

        // Get category name from first post
        if (fetchedPosts.length > 0) {
          const cat = fetchedPosts[0].categories.edges.find((edge: any) => edge.node.slug === categorySlug);
          if (cat) setCategoryName(cat.node.name);
        }

      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-brand mx-auto mb-4"></div>
          <p className="text-gray-text font-medium">Loading articles...</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {categoryName || 'Category'} Articles
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore all articles in the {categoryName || categorySlug} category.
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
              <span className="text-gray-500">Category: {categoryName || categorySlug}</span>
            </nav>
          </div>

          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {paginatedPosts.map((post: Post) => (
                  <ArticleCard key={post.id} post={post} formatDate={formatDate} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-border">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium text-lg">No articles found in this category.</p>
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