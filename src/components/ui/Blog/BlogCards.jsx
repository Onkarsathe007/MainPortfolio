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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-left max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group"
            >
              <div className={`grid gap-8 md:gap-12 lg:gap-16 items-center ${
                index % 2 === 0 
                  ? 'md:grid-cols-2' 
                  : 'md:grid-cols-2'
              }`}>
                <div className={`space-y-4 md:space-y-6 ${
                  index % 2 === 0 
                    ? 'order-2 md:order-1' 
                    : 'order-2 md:order-2'
                }`}>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {post.categories?.map((category) => (
                      <span 
                        key={category}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground">
                    <Link
                      to={`/blog/${post._id}`}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {truncateContent(post.content)}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <span className="font-medium">{post.author}</span>
                    <span className="hidden sm:inline">•</span>
                    <time dateTime={post.createdAt}>
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  
                  <div className="pt-2">
                    <Link
                      to={`/blog/${post._id}`}
                      className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors duration-200 group"
                    >
                      <span className="text-sm md:text-base">Read more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                
                <div className={`${
                  index % 2 === 0 
                    ? 'order-1 md:order-2' 
                    : 'order-1 md:order-1'
                }`}>
                  <Link to={`/blog/${post._id}`} className="block group">
                    <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-xl border border-border/50 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02] group-hover:border-primary/20">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-110"
                        onError={(e) => {
                          e.target.src = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg";
                        }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog8 };
