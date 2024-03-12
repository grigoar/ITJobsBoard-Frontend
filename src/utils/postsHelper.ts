import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { generalTextSplitter } from './generalHelper';
import { BlogPostModel } from '../models/BlogPosts/BlogPostModel';

const postsDirectory = path.join(process.cwd(), 'src', 'blog-posts-md');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
  // remove .md extension
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const countWords = generalTextSplitter(content).length;

  const readTime = Math.ceil(countWords / 250);

  data.title = data.title.replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
  const labels = data.labels.split(/[,\s]+/).map((label: string) => label.trim().toLowerCase());

  const postData = {
    slug: postSlug,
    ...data,
    content,
    readTime,
    labels,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  // @ts-ignore
  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
  return sortedPosts;
}

export function getFeaturedPosts(allPosts: BlogPostModel[]) {
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export function getFeaturedPostsLocalFiles() {
  const allPosts = getAllPosts();

  // @ts-ignore
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export function getRandomFeaturedPostsLocalFiles(currentPostSlug: string, numberOfPosts: number = 3) {
  const allPosts = getAllPosts();

  const randomFeaturedPostsPossible = allPosts.filter((post) => post.slug !== currentPostSlug);
  const randomFeaturedPostsShuffled = randomFeaturedPostsPossible.sort(() => Math.random() - 0.5);
  const randomFeaturedPostsDisplay = randomFeaturedPostsShuffled.slice(0, numberOfPosts);
  return randomFeaturedPostsDisplay;
}

export function filterPosts(posts: BlogPostModel[], searchTerm: string, activeTopics: string[]) {
  // posts.forEach((post) => {
  //   let isPostActive = true;
  //   post.labels?.forEach((label) => {
  //     if (!activeTopics.includes(label)) {
  //       isPostActive = false;
  //     }
  //   });
  // });
  const filteredPostsSearch = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const possibleTagsRemaining: string[] = [];
  // filteredPostsSearch.forEach((post) => {
  //   post.labels?.forEach((label) => {
  //     if (!activeTopics.includes(label)) {
  //       possibleTagsRemaining.push(label);
  //     }
  //   });
  // });

  if (activeTopics.length === 0) {
    return { filteredPostsSearch, possibleTagsRemaining: undefined };
  }

  // const activeTopicsPosts = filteredPostsSearch.filter((post) => {
  //   let isPostActive = true;
  //   // check if the post has all the active topics
  //   activeTopics.forEach((topic) => {
  //     if (!post.labels?.includes(topic)) {
  //       isPostActive = false;
  //     }
  //   });
  //   return isPostActive;
  // });
  // if (activeTopicsPosts.length === 0) {
  //   return filteredPostsSearch;
  // }
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
