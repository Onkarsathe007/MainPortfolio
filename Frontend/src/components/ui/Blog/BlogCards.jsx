import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogAPI from "../../../services/blogAPI";

const Blog8 = ({
  heading = "Welcome to My Blogs",
  description = "Discover the latest insights about linux ecosystem, Web technology, and my Life journey and much more...",
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await BlogAPI.getAllBlogs();
        setPosts(blogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    // Use different lengths for different screen sizes
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const length = isMobile ? 100 : maxLength;
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12 sm:gap-14 md:gap-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              {heading}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12 sm:gap-14 md:gap-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              {heading}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-red-500 leading-relaxed max-w-2xl mx-auto">
              Error loading blogs: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12 sm:gap-14 md:gap-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-12 items-center">
                <div className="order-2 md:order-1 space-y-4 md:space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs tracking-wider text-muted-foreground uppercase sm:gap-3 md:gap-4">
                      {post.categories?.map((category) => <span key={category}>{category}</span>)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                    <Link
                      to={`/blog/${post._id}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {truncateContent(post.content)}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                    <span className="text-muted-foreground">{post.author}</span>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to={`/blog/${post._id}`}
                      className="inline-flex items-center font-semibold hover:underline text-sm md:text-base transition-colors"
                    >
                      <span>Read more</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Link to={`/blog/${post._id}`} className="block">
                    <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-lg border border-border transition-transform hover:scale-[1.02]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-90"
                        onError={(e) => {
                          e.target.src = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg";
                        }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog8 };
