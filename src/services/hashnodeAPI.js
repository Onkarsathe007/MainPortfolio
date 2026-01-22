const HASHNODE_API_URL = 'https://gql.hashnode.com';

class HashnodeAPI {
  static async makeGraphQLRequest(query, variables = {}) {
    try {
      const response = await fetch(HASHNODE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error('Error making GraphQL request:', error);
      throw error;
    }
  }

  static async getAllPosts(username) {
    const query = `
      query Publication($host: String!) {
        publication(host: $host) {
          posts(first: 20) {
            edges {
              node {
                id
                slug
                title
                brief
                content {
                  markdown
                }
                coverImage {
                  url
                }
                author {
                  name
                }
                publishedAt
                tags {
                  name
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.makeGraphQLRequest(query, {
      host: username,
    });

    if (!data.publication || !data.publication.posts) {
      return [];
    }

    return data.publication.posts.edges.map((edge) => ({
      _id: edge.node.id,
      slug: edge.node.slug,
      title: edge.node.title,
      content: edge.node.brief || edge.node.content.markdown.substring(0, 200),
      image: edge.node.coverImage?.url || 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
      author: edge.node.author.name,
      createdAt: edge.node.publishedAt,
      categories: edge.node.tags?.map((tag) => tag.name) || [],
    }));
  }

  static async getPostBySlug(username, slug) {
    const query = `
      query Publication($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            id
            slug
            title
            content {
              markdown
            }
            coverImage {
              url
            }
            author {
              name
            }
            publishedAt
            tags {
              name
            }
          }
        }
      }
    `;

    const data = await this.makeGraphQLRequest(query, {
      host: username,
      slug,
    });

    if (!data.publication || !data.publication.post) {
      throw new Error('Post not found');
    }

    const post = data.publication.post;

    return {
      _id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content.markdown,
      image: post.coverImage?.url || 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg',
      author: post.author.name,
      createdAt: post.publishedAt,
      categories: post.tags?.map((tag) => tag.name) || [],
    };
  }
}

export default HashnodeAPI;
