import { BlogPostModel } from '../models/BlogPosts/BlogPostModel';

export function getFeaturedPosts(allPosts: BlogPostModel[]) {
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export function filterPosts(posts: BlogPostModel[], searchTerm: string, activeTopics: string[]) {
  const filteredPostsSearch = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const possibleTagsRemaining: string[] = [];

  if (activeTopics.length === 0) {
    return { filteredPostsSearch, possibleTagsRemaining: undefined };
  }

  const activeTopicsPosts = filteredPostsSearch.filter((post) => {
    return activeTopics.every((topic) => post.labels?.includes(topic));
  });

  // check if any post have a tag that is not in the active topics
  activeTopicsPosts.forEach((post) => {
    post.labels?.forEach((label) => {
      if (!activeTopics.includes(label)) {
        possibleTagsRemaining.push(label);
      }
    });
  });
  activeTopics.forEach((topic) => {
    possibleTagsRemaining.push(topic);
  });

  return { filteredPostsSearch: activeTopicsPosts, possibleTagsRemaining };
}

export function getAllPostsLabels(posts: BlogPostModel[]) {
  const uniqueLabels: string[] = [];
  posts.forEach((post) => {
    post.labels?.forEach((label) => {
      if (!uniqueLabels.includes(label)) {
        uniqueLabels.push(label);
      }
    });
  });

  return uniqueLabels;
}
