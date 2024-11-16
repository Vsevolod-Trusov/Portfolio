function Main() {
  const postsListContainer = document.querySelector(".posts-container");
  const progressBar = document.querySelector(".progress-bar");

  function fetchListOfPosts() {
    const address = "https://dummyjson.com/posts";

    fetch(address, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => displayPosts(data.posts));
  }

  function displayPosts(posts) {
    posts.forEach((postItem) => {
      const postItemWrapper = document.createElement("div");
      postItemWrapper.classList.add("post-item-wrapper");

      const postTitle = document.createElement("label");
      postTitle.textContent = postItem.title;

      const postBody = document.createElement("p");
      postBody.textContent = postItem.body;

      const postTags = document.createElement("div");
      postTags.textContent = postItem.tags.map((tagItem) => tagItem).join(",");
      postTags.classList.add("post-tags");

      postItemWrapper.appendChild(postTitle);
      postItemWrapper.appendChild(postBody);
      postItemWrapper.appendChild(postTags);
      postsListContainer.appendChild(postItemWrapper);
    });
  }

  function handleScroll() {
    const getScrollFromTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const howMuchPercentageAlreadyScrolled = (getScrollFromTop / height) * 100;
    progressBar.style.width = `${howMuchPercentageAlreadyScrolled}%`;
  }

  return () => {
    fetchListOfPosts();

    window.onscroll = () => {
      handleScroll();
    };
  };
}

const main = Main();
main();
