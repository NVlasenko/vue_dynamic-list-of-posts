const USERS_KEY = "registered_users";
const USER_POSTS_KEY = "user_posts";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
};

export const addUser = (newUser) => {
  const users = getUsers();
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    throw new Error("A user with this email is already registered.");
  }

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUserPost = (userId, newPost) => {
  const allPosts = JSON.parse(localStorage.getItem(USER_POSTS_KEY) || "{}");
  if (!allPosts[userId]) {
    allPosts[userId] = [];
  }

  if (allPosts[userId].find(post => post.id === newPost.id)) {
    console.warn(`Post with ID ${newPost.id} already exists for user ${userId}.`);
    return; 
  }

  allPosts[userId].push(newPost);
  localStorage.setItem(USER_POSTS_KEY, JSON.stringify(allPosts));
};

export const getUserPosts = (userId) => {
  const allPosts = JSON.parse(localStorage.getItem(USER_POSTS_KEY) || "{}");
  return allPosts[userId] || [];
};

export const deleteUserPost = (userId, postId) => {
  const allPosts = JSON.parse(localStorage.getItem(USER_POSTS_KEY) || "{}");
  
  if (allPosts[userId]) {
    allPosts[userId] = allPosts[userId].filter(post => post.id !== postId);
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(allPosts));
  } else {
    console.warn(`No posts found for user ${userId}.`);
  }
};
