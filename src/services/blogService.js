import sanityClient from './sanity';

export const fetchAllPosts = async () => {
  return sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    "author": author->name,
    mainImage {
      asset -> {
        url
      }
    },
    categories[]->{
      title,
      _id
    }
  }`);
};