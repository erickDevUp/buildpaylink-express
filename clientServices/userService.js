const userServiceFactory = () => {
  function login(username, password ,adr) {
    return fetch(adr, {
      method: "POST",
      body: JSON.stringify({ username, password }),      
      headers: { "Content-type": "application/json" },
    });
  }
  return { login };
};

module.exports = {
  userServiceFactory,
};
