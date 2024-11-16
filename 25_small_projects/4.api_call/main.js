import { ERRORS, JSON, Methods, URL } from "./constants.js";
import {
  displayPosts,
  getPosts,
  handleParsedDataFetch,
  handleXhrResponseWrapper,
  hanledFetchResponse,
} from "./helpers.js";

function getDataXHR() {
  const xhr = new XMLHttpRequest();

  xhr.open(Methods.GET, URL);
  xhr.responseType = JSON;
  xhr.send();
  xhr.onload = handleXhrResponseWrapper(xhr);
}

function getDataFetch() {
  fetch(URL, { method: Methods.GET })
    .then(hanledFetchResponse)
    .then(handleParsedDataFetch)
    .catch((error) => {
      alert(error.message);
    });
}

async function getDataUsingAsyncAwaitFetch() {
  const response = await fetch(URL, { method: Methods.GET });

  if (!response.ok) {
    alert(ERRORS.FAILED);
    return;
  }

  const data = await response.json();

  displayPosts(data);
}

async function getDataUsingAsyncAwaitAndXhr() {
  const responseData = await getPosts(Methods.GET, URL);

  displayPosts(responseData);
}

function main() {
  // getDataXHR();
  // getDataFetch();
  // getDataUsingAsyncAwaitFetch();
  getDataUsingAsyncAwaitAndXhr();
}

main();
