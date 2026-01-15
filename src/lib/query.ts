export const getBlogPostsQuery = (page: number, limit: number) => `
  *[_type == "blogPost"] | order(date desc) [${(page - 1) * limit}...${page * limit}]{
    _id,
    title,
    slug,
    date,
    place,
    tag,
    image{
      asset->{
        _id,
        url
      }
    },
    description
  }
`;

// To get total posts
export const getTotalCountQuery = `count(*[_type == "blogPost"])`;
