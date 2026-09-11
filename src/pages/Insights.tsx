import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, Mail } from 'lucide-react';
import { gql } from '@apollo/client';

// GraphQL queries
const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      edges {
        node {
          id
          name
          slug
          description
        }
      }
    }
  }
`;

const GET_FEATURED_POST = gql`
  query GetFeaturedPost {
    posts(first: 1, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
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

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// Simple GraphQL query printer
const print = (query: any) => {
  if (typeof query === 'string') return query;
  return query.loc?.source?.body || '';
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Featured Article Card Component
interface FeaturedCardProps {
  post: Post;
  formatDate: (dateString: string) => string;
}

const FeaturedCard = ({ post, formatDate }: FeaturedCardProps) => (
  <article className="bg-white border border-gray-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="grid md:grid-cols-[40%_60%] gap-0 min-h-80">
      {/* Image - Left side (~40%) */}
      <div className="hidden md:block bg-gray-200">
        {post.featuredImage?.node?.sourceUrl ? (
          <img
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm opacity-50">No image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content - Right side (~60%) */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          {post.categories.edges[0]?.node.slug ? (
            <Link
              to={`/insights/category/${post.categories.edges[0].node.slug}`}
              className="inline-block text-green-light text-xs font-semibold uppercase tracking-wider hover:text-green-brand transition-colors"
            >
              {post.categories.edges[0].node.name}
            </Link>
          ) : (
            <span className="inline-block text-green-light text-xs font-semibold uppercase tracking-wider">
              {post.categories.edges[0]?.node.name || 'Featured'}
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-4 leading-tight">
          {post.title}
        </h2>
        <p className="text-gray-text text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
          {post.excerpt.replace(/<[^>]*>/g, '')}
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-green-brand" />
            {formatDate(post.date)}
          </span>
        </div>
        <div>
          <Link
            to={`/insights/${post.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-brand text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Read More <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  </article>
);

// Article Grid Card Component
interface ArticleCardProps {
  post: Post;
  formatDate: (dateString: string) => string;
}

const ArticleCard = ({ post, formatDate }: ArticleCardProps) => (
  <article className="bg-white border border-gray-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
    {/* Image - Top */}
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

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-2 mb-3">
        {post.categories.edges[0]?.node.slug ? (
          <Link
            to={`/insights/category/${post.categories.edges[0].node.slug}`}
            className="inline-block text-green-light text-xs font-semibold uppercase tracking-wider hover:text-green-brand transition-colors"
          >
            {post.categories.edges[0].node.name}
          </Link>
        ) : (
          <span className="inline-block text-green-light text-xs font-semibold uppercase tracking-wider">
            {post.categories.edges[0]?.node.name || 'Article'}
          </span>
        )}
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

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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

// Sidebar Widget Component
interface SidebarWidgetProps {
  title: string;
  children: React.ReactNode;
}

const SidebarWidget = ({ title, children }: SidebarWidgetProps) => (
  <div className="bg-white border border-gray-border rounded-2xl p-8">
    <h3 className="text-sm font-bold text-green-brand uppercase tracking-wider mb-6">{title}</h3>
    {children}
  </div>
);

// ============================================
// MAIN INSIGHTS PAGE COMPONENT
// ============================================

export default function Insights() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch featured post
        const featuredResult = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(GET_FEATURED_POST) }),
        });
        const featuredJson = await featuredResult.json();
        if (featuredJson.data?.posts?.edges?.length > 0) {
          setFeaturedPost(featuredJson.data.posts.edges[0].node);
        }

        // Fetch latest posts (9 posts to have enough for pagination)
        const postsResult = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(GET_POSTS), variables: { first: 9 } }),
        });
        const postsJson = await postsResult.json();
        const allPosts = postsJson.data?.posts?.edges?.map((edge: any) => edge.node) || [];
        const featuredPostId = featuredJson.data?.posts?.edges?.[0]?.node?.id;
        const fetchedLatestPosts = featuredPostId
          ? allPosts.filter((post: Post) => post.id !== featuredPostId)
          : allPosts;
        setLatestPosts(fetchedLatestPosts);

        // Fetch categories
        const categoriesResult = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(GET_CATEGORIES) }),
        });
        const categoriesJson = await categoriesResult.json();
        const fetchedCategories = categoriesJson.data?.categories?.edges?.map((edge: any) => edge.node) || [];
        setCategories(fetchedCategories);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter posts based on search
  const filteredPosts = latestPosts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.categories.edges.some((cat: any) =>
      cat.node.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Reset pagination when search term changes so results always show from page 1.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  // Handle newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-brand mx-auto mb-4"></div>
          <p className="text-gray-text font-medium">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-6 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-brand text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Insights & Resources</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Practical knowledge, expert advice and business insights to help SMEs grow and succeed.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-gray-pale">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar - Full Width */}
          <div className="mb-16">
            <div className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border border-gray-border rounded-xl focus:ring-2 focus:ring-green-brand focus:border-transparent font-medium text-navy placeholder-gray-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Two Column Grid: Main Content + Sidebar */}
          <div className="grid lg:grid-cols-[80%_20%] gap-12">
            
            {/* Left Column - Articles (80%) */}
            <div className="space-y-12">
              
              {/* Featured Article Section */}
              {featuredPost && (
                <div>
                  <h2 className="text-sm font-bold text-green-brand uppercase tracking-widest mb-8">✦ Featured Article</h2>
                  <FeaturedCard post={featuredPost} formatDate={formatDate} />
                </div>
              )}

              {/* Latest Articles Section */}
              <div>
                <h2 className="text-sm font-bold text-green-brand uppercase tracking-widest mb-8">✦ Latest Articles</h2>
                
                {paginatedPosts.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-3 gap-8">
                      {paginatedPosts.map((post: Post) => (
                        <ArticleCard key={post.id} post={post} formatDate={formatDate} />
                      ))}
                    </div>

                    {/* Pagination */}
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
                    <p className="text-gray-500 font-medium text-lg">No articles found matching your search.</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 text-green-brand font-semibold hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar (~30%) */}
            <div className="space-y-8">
              
              {/* Categories Widget */}
              <SidebarWidget title="Categories">
                <div className="space-y-4">
                  {categories.slice(0, 5).map((category: Category) => (
                    <Link
                      key={category.id}
                      to={`/insights/category/${category.slug}`}
                      className="block pb-4 border-b border-gray-border last:border-b-0 hover:text-green-brand transition-colors"
                    >
                      <h4 className="font-semibold text-navy mb-1 text-sm">{category.name}</h4>
                      {category.description && (
                        <p className="text-gray-text text-xs leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
                {categories.length > 5 && (
                  <div className="mt-6 pt-6 border-t border-gray-border">
                    <Link
                      to="/insights/categories"
                      className="inline-flex items-center gap-2 text-green-brand font-semibold text-sm hover:gap-3 transition-all"
                    >
                      View All <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </SidebarWidget>

              {/* Business Support CTA Widget */}
              <div className="bg-gradient-to-br from-green-light to-green-100 rounded-2xl p-8 border border-green-200 shadow-sm">
                <h3 className="text-lg font-bold text-navy mb-3">Need Business Support?</h3>
                <p className="text-navy text-sm leading-relaxed mb-6">
                  Get expert advice and personalized support for your business growth journey.
                </p>
                <Link
                  to="/contact"
                  className="block w-full bg-navy text-white text-center font-semibold py-3 rounded-xl hover:bg-navy/90 transition-colors"
                >
                  Get Started
                </Link>
              </div>

              {/* Newsletter Subscribe Widget */}
              <SidebarWidget title="Subscribe">
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <p className="text-gray-text text-sm leading-relaxed">
                    Get the latest insights and business tips delivered to your inbox.
                  </p>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-border rounded-lg focus:ring-2 focus:ring-green-brand focus:border-transparent text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-brand text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Subscribe
                  </button>
                  {newsletterSubmitted && (
                    <p className="text-green-600 text-sm font-medium text-center">
                      ✓ Thank you for subscribing!
                    </p>
                  )}
                  <p className="text-gray-500 text-xs">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </SidebarWidget>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
