async function getUserId() {
    try {
      const response = await fetch('/api/session');
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

module.exports = getUserId;