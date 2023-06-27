import React from 'react';
// import getCookie from '';

export function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

const csrftoken = getCookie('csrftoken');

const CSRFTOKEN = () => {
    return (
        <input value={csrftoken} name="csrfmiddlewaretoken" type="hidden"/>
    );
};

export default CSRFTOKEN;