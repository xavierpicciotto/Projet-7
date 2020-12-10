export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("AUTH HEADER" +JSON.stringify(user))
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }