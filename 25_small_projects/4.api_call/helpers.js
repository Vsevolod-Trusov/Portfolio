import { ERRORS, Items, JSON, SPACE } from "./constants.js";

// XHR SECTION
const handleXhrResponseWrapper = (xhr) => () => displayPosts(xhr.response);
const buildPostItem = (item) => `
<div class='post-item'>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
</div>
`;
const displayPosts = (posts) => {
  console.log(posts);
  const postsListContainer = document.querySelector(Items.POSTS_CONTAINER);

  if (!(posts instanceof Array)) {
    alert(ERRORS.FAILED);
    return;
  }

  postsListContainer.innerHTML = posts.map(buildPostItem).join(SPACE);
};

// FETCH SECTION
const hanledFetchResponse = (response) => {
  if (!response.ok) {
    throw new Error(ERRORS.FAILED);
  }

  return response.json();
};

const handleParsedDataFetch = (data) => {
  displayPosts(data);
};

//ASYNC AWAIT WITH XHR
const getPosts = (method, url) => {
  const xhrPromise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = JSON;
    xhr.send();
    xhr.onload = handlePromiseXHR(xhr, resolve, reject);
  });

  return xhrPromise;
};

function handlePromiseXHR(xhr, resolve, reject) {
  return () =>
    xhr.status === 200 ? resolve(xhr.response) : reject(xhr.response);
}

export {
  buildPostItem,
  displayPosts,
  getPosts,
  handleParsedDataFetch,
  handlePromiseXHR,
  handleXhrResponseWrapper,
  hanledFetchResponse,
};
