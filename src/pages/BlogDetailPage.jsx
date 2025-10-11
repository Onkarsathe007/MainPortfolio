import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import BlogAPI from "../services/blogAPI";
import { marked } from "marked";
import DOMPurify from "dompurify";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogData = await BlogAPI.getBlogById(id);
        setBlog(blogData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center text-blue-500 hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center text-blue-500 hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 sm:mb-6 lg:mb-8 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to Blogs
          </Link>

          {/* Blog Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {/* Blog Meta Information */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex items-center">
                <User className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm lg:text-base">{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm lg:text-base">{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {blog.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    <Tag className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {category}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-6 sm:mb-8">
              <div className="aspect-video overflow-hidden rounded-lg border">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg";
                  }}
                />
              </div>
            </div>
          )}

          {/* Blog Content */}
          <article
            className="prose prose-sm sm:prose-base lg:prose-lg prose-gray dark:prose-invert max-w-none 
                       prose-headings:text-foreground prose-p:text-muted-foreground prose-p:text-sm prose-p:sm:text-base prose-p:leading-relaxed
                       prose-h1:text-lg prose-h1:sm:text-xl prose-h1:lg:text-2xl prose-h1:xl:text-3xl
                       prose-h2:text-base prose-h2:sm:text-lg prose-h2:lg:text-xl prose-h2:xl:text-2xl
                       prose-h3:text-sm prose-h3:sm:text-base prose-h3:lg:text-lg prose-h3:xl:text-xl
                       prose-strong:text-gray-600 dark:prose-strong:text-gray-400 prose-strong:font-medium
                       prose-em:text-muted-foreground
                       prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:text-sm prose-blockquote:sm:text-base
                       prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:sm:text-sm
                       prose-pre:bg-muted prose-pre:text-foreground prose-pre:text-xs prose-pre:sm:text-sm prose-pre:overflow-x-auto
                       prose-a:text-primary hover:prose-a:text-primary/80 prose-a:text-sm prose-a:sm:text-base
                       prose-li:text-sm prose-li:sm:text-base prose-li:text-muted-foreground
                       prose-ul:my-4 prose-ol:my-4
                       prose-img:rounded-lg prose-img:border prose-img:w-full prose-img:max-w-full prose-img:h-auto"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(blog.content)),
            }}
          />
          {/* Footer */}
          <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Published by <span className="font-medium">{blog.author}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(blog.createdAt)}
                </p>
              </div>
              <Link 
                to="/blogs" 
                className="inline-flex items-center text-xs sm:text-sm text-blue-500 hover:underline"
              >
                <ArrowLeft className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                More Articles
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
