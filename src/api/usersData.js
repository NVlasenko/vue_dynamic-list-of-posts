export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');

export const addUser = (user) => {
  const users = getUsers();
  users.push(user); 
  localStorage.setItem('users', JSON.stringify(users));
};
