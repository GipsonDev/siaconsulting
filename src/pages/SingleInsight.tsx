import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Share2, X, MessageSquare, Calendar } from 'lucide-react';
import { gql } from '@apollo/client';

const GET_SINGLE_POST = gql`
  query GetSinglePost {
    posts(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          date
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          tags {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
    categories(first: 50) {
      edges {
        node {
          id
          name
          slug
          count
        }
      }
    }
  }
`;

interface PostNode {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  author?: {
    node: {
      name: string;
    };
  };
  categories: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        slug: string;
      };
    }>;
  };
  tags: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        slug: string;
      };
    }>;
  };
}

interface RelatedPostNode {
  id: string;
  title: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    edges: Array<{
      node: {
        slug: string;
      };
    }>;
  };
}

interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

const print = (query: any) => {
  if (typeof query === 'string') return query;
  return query.loc?.source?.body || '';
};

const Breadcrumb = ({ categoryName, postTitle }: { categoryName: string; postTitle: string; }) => (
  <nav className="text-xs text-gray-text tracking-wide mb-6">
    <Link to="/" className="text-gray-text hover:text-navy">Home</Link>
    <span className="mx-2">/</span>
    <Link to="/insights" className="text-gray-text hover:text-navy">Insights</Link>
    <span className="mx-2">/</span>
    <span className="text-gray-text">{categoryName}</span>
    <span className="mx-2">/</span>
    <span className="text-gray-500">{postTitle}</span>
  </nav>
);

const PostHeader = ({ post }: { post: PostNode }) => (
  <header className="space-y-5">
    <div>
      {post.categories.edges[0]?.node.slug ? (
        <Link
          to={`/insights/category/${post.categories.edges[0].node.slug}`}
          className="text-xs uppercase tracking-[0.24em] text-green-light font-semibold hover:text-green-brand transition-colors"
        >
          {post.categories.edges[0].node.name}
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-[0.24em] text-green-light font-semibold">
          {post.categories.edges[0]?.node.name || 'Insights'}
        </span>
      )}
    </div>
    <h1 className="text-3xl md:text-4xl font-semibold text-navy leading-tight">
      {post.title}
    </h1>
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
      <span>{post.author?.node.name || 'Sia Consulting'}</span>
      <span className="before:content-['•'] before:mx-2 before:text-gray-300 hidden sm:inline-block"></span>
      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>
  </header>
);

const PostContent = ({ content }: { content: string; }) => (
  <div className="insight-content max-w-3xl mx-auto mt-10 text-gray-700">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const TagsList = ({ tags }: { tags: PostNode['tags']; }) => (
  <div className="flex flex-wrap gap-2">
    <span className="text-sm font-semibold text-gray-500">Tags:</span>
    {tags.edges.map((tag) => (
      <Link
        key={tag.node.id}
        to={`/insights/tag/${tag.node.slug}`}
        className="text-sm text-green-brand border border-green-light rounded-full px-3 py-1 hover:bg-green-light transition-colors"
      >
        {tag.node.name}
      </Link>
    ))}
  </div>
);

const ShareBar = () => (
  <div className="flex flex-wrap items-center gap-4 text-gray-500 mt-8">
    <span className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-400">Share</span>
    <button className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-border text-gray-500 hover:text-navy hover:border-green-brand transition-colors">
      <Share2 size={18} />
    </button>
    <button className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-border text-gray-500 hover:text-navy hover:border-green-brand transition-colors">
      <X size={18} />
    </button>
    <button className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-border text-gray-500 hover:text-navy hover:border-green-brand transition-colors">
      <MessageSquare size={18} />
    </button>
    <button className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-border text-gray-500 hover:text-navy hover:border-green-brand transition-colors">
      <Share2 size={18} />
    </button>
  </div>
);

const PostNavigation = ({ previous, next }: { previous?: RelatedPostNode; next?: RelatedPostNode; }) => (
  <div className="grid sm:grid-cols-2 gap-6 mt-12">
    <div className="rounded-3xl border border-gray-border bg-white p-6">
      <span className="text-xs uppercase tracking-[0.24em] text-gray-400 font-semibold">Previous</span>
      {previous ? (
        <Link to={`/insights/${previous.slug}`} className="mt-4 block text-lg font-semibold text-navy hover:text-green-brand">
          {previous.title}
        </Link>
      ) : (
        <p className="mt-4 text-sm text-gray-500">No previous post available</p>
      )}
    </div>
    <div className="rounded-3xl border border-gray-border bg-white p-6">
      <span className="text-xs uppercase tracking-[0.24em] text-gray-400 font-semibold">Next</span>
      {next ? (
        <Link to={`/insights/${next.slug}`} className="mt-4 block text-lg font-semibold text-navy hover:text-green-brand">
          {next.title}
        </Link>
      ) : (
        <p className="mt-4 text-sm text-gray-500">No next post available</p>
      )}
    </div>
  </div>
);

const SidebarTile = ({ title, children }: { title: string; children: React.ReactNode; }) => (
  <div className="bg-white border border-gray-border rounded-3xl p-8 space-y-6">
    <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-green-brand">{title}</h2>
    {children}
  </div>
);


const CategoriesList = ({ categories }: { categories: CategoryNode[]; }) => (
  <div className="space-y-3">
    {categories.map((category) => (
      <Link
        key={category.id}
        to={`/insights/category/${category.slug}`}
        className="flex items-center justify-between text-sm text-gray-600 hover:text-navy transition-colors"
      >
        <span>{category.name}</span>
        <span className="text-gray-400">{category.count ?? 0}</span>
      </Link>
    ))}
  </div>
);

const CTAWidget = () => (
  <div className="relative rounded-3xl overflow-hidden h-72 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center">
    <div className="absolute inset-0 bg-navy/70" />
    <div className="relative h-full p-8 flex flex-col justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-green-light mb-3">Training Program</p>
        <h3 className="text-2xl font-semibold text-white leading-tight">Join Our Women In Digital Business Training</h3>
      </div>
      <Link to="/training" className="inline-flex items-center justify-center bg-white text-navy font-semibold rounded-full px-6 py-3 shadow-md hover:bg-gray-100 transition-colors">
        Learn More
      </Link>
    </div>
  </div>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-600 text-sm">Subscribe to receive the latest insights and industry updates.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-2xl border border-gray-border px-4 py-3 text-sm focus:ring-2 focus:ring-green-brand focus:border-transparent"
      />
      <button type="submit" className="w-full rounded-2xl bg-green-brand text-white py-3 font-semibold hover:bg-green-700 transition-colors">
        Subscribe
      </button>
      {submitted && <p className="text-green-600 text-sm">Thanks for subscribing!</p>}
    </form>
  );
};

export default function SingleInsight() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostNode | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPostNode[]>([]);
  const [allPosts, setAllPosts] = useState<RelatedPostNode[]>([]);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const queryString = print(GET_SINGLE_POST);
        
        const response = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryString }),
        });

        const json = await response.json();
        
        // Log errors from GraphQL response
        if (json.errors) {
          console.error('GraphQL Errors:', json.errors);
          setError(`GraphQL Error: ${json.errors[0]?.message || 'Unknown error'}`);
          setLoading(false);
          return;
        }

        // Get all posts and find the one matching the slug
        const allPostsData = json.data?.posts?.edges?.map((edge: any) => edge.node) || [];
        const fetchedPost = allPostsData.find((post: any) => post.slug === slug);
        const fetchedCategories = json.data?.categories?.edges?.map((edge: any) => edge.node) || [];

        if (!fetchedPost) {
          console.error('Post not found for slug:', slug);
          console.error('Available slugs:', allPostsData.map((p: any) => p.slug));
          setError(`Could not find post with slug: "${slug}". Please check the URL and try again.`);
          setLoading(false);
          return;
        }

        setPost(fetchedPost);
        setCategories(fetchedCategories);
        setAllPosts(allPostsData);

        const currentCategorySlug = fetchedPost.categories.edges[0]?.node.slug;
        const related = currentCategorySlug
          ? allPostsData
              .filter((item: RelatedPostNode) => item.id !== fetchedPost.id)
              .filter((item: RelatedPostNode) =>
                item.categories.edges.some((cat) => cat.node.slug === currentCategorySlug)
              )
              .slice(0, 3)
          : allPostsData.filter((item: RelatedPostNode) => item.id !== fetchedPost.id).slice(0, 3);

        setRelatedPosts(related.length ? related : allPostsData.filter((item: RelatedPostNode) => item.id !== fetchedPost.id).slice(0, 5));
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Unable to load the post. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-brand mx-auto mb-4"></div>
          <p className="text-gray-text font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-6 font-semibold">{error || 'Article could not be loaded.'}</p>
          <Link to="/insights" className="inline-flex items-center gap-2 text-green-brand font-semibold hover:text-green-700">
            Go back to insights <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = post.categories.edges[0]?.node.name || 'Insights';
  const currentIndex = allPosts.findIndex((item) => item.slug === slug);
  const previous = currentIndex >= 0 ? allPosts[currentIndex + 1] : undefined;
  const next = currentIndex >= 0 ? allPosts[currentIndex - 1] : undefined;

  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[70%_30%] gap-10">
            <main className="space-y-12">
              <div>
                <Breadcrumb categoryName={categoryName} postTitle={post.title} />
                <PostHeader post={post} />
                <PostContent content={post.content} />
                <div className="grid gap-6">
                  <TagsList tags={post.tags} />
                  <ShareBar />
                  <PostNavigation previous={previous} next={next} />
                </div>
                {relatedPosts.length > 0 && (
                  <div className="mt-12 pt-12 border-t border-gray-border">
                    <h2 className="text-2xl font-bold text-navy mb-8">Related Posts</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/insights/${relatedPost.slug}`}
                          className="bg-white border border-gray-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="w-full bg-gray-200 aspect-video flex items-center justify-center overflow-hidden">
                            {relatedPost.featuredImage?.node.sourceUrl ? (
                              <img
                                src={relatedPost.featuredImage.node.sourceUrl}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center text-gray-500">
                                <Calendar size={24} className="mx-auto mb-2 opacity-20" />
                                <p className="text-xs opacity-50">No image</p>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-bold text-navy mb-3 leading-snug">
                              {relatedPost.title}
                            </h3>
                            <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="text-green-brand font-semibold text-sm">
                              Read More →
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </main>

            <aside className="space-y-6">
              <SidebarTile title="Categories">
                <CategoriesList categories={categories} />
              </SidebarTile>

              <SidebarTile title="Training Program">
                <CTAWidget />
              </SidebarTile>

              <SidebarTile title="Newsletter">
                <NewsletterForm />
              </SidebarTile>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
