import { isLoggedIn, logedInUser, user_status } from "./signup_login.js";
class Posts {
  constructor(userName, text, likedBy = []) {
    this.userName = userName;
    this.status = text;
    this.likedBy = likedBy;
  }
}
class Likes {
  constructor(whoPressd, whereLiked) {
    this.person = whoPressd;
    this.postIndex = whereLiked;
  }
}
class NewComments {
  constructor(person, index) {
    this.whoWantToComment = person;
    this.postIndex = index;
  }
}
class Comments {
  constructor(userName, text, whereLocated, likedBy = [], parentIndex) {
    this.userName = userName;
    this.status = text;
    this.whereLocated = whereLocated;
    this.likedBy = likedBy;
    this.parentIndex = parentIndex;
  }
}
let likedPosts = [];
let likedComms = [];
let likesForPost = [];
let likesForcomms = [];
let shareButton = document.getElementById("shareButton");
let postSection = document.getElementById("postSection");
let existingPosts = [];
let existingComms = [];
let postsContainers = [];
let commContainers = [];
let numOfPost = 0;
const showWhoLiked = (index, who, post, commentElement) => {
  console.log(index, who);
  let postContents = document.querySelectorAll(".postsContent");
  let commContents = document.querySelectorAll(".commContent");

  if (postContents || commContents) {
    if (post) {
      let postContent = postContents[index];
      let like = postContent.querySelector(".like");
      if (like) {
        like.setAttribute("data-toggle", "tooltip");
        like.setAttribute("data-placement", "top");
        like.setAttribute("title", `${who} liked this`);
      } else {
        console.log("No element with the class .like in postContent");
      }
    } else {
      let parentElement = commentElement.parentNode;
      let likeComm = parentElement.querySelector(".likeOnComment");
      console.log(likeComm);
      if (likeComm) {
        likeComm.setAttribute("data-toggle", "tooltip");
        likeComm.setAttribute("data-placement", "top");
        likeComm.setAttribute("title", `${who} liked this`);
      } else {
        console.log("No element with the class .likeOnComment in commContent");
      }
    }
  } else {
    console.log("No elements with the class postsContent or commContent");
  }
};
const whoLikedthePost = (postIndex, logedInUser) => {
  existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
  // Filter the likedPosts array to only include likes for the specified post
  likesForPost = likedPosts.filter((like) => like.postIndex === postIndex);
  // Log who liked the post
  for (let like of likesForPost) {
    // console.log("who liked:", logedInUser, "what he liked:", like.postIndex);
    if (
      existingPosts[like.postIndex] &&
      Array.isArray(existingPosts[like.postIndex].likedBy)
    ) {
    } else {
      console.log(
        "like.likedBy is not an array or existingPosts[like.postIndex] is undefined"
      );
    }
  }

  // Ensure that the postIndex is valid and within the range of existingPosts
  if (postIndex >= 0 && postIndex < existingPosts.length) {
    // Push the loggedInUser to the likedBy array of the specific post
    existingPosts[postIndex].likedBy.push(logedInUser);
    localStorage.setItem("posts", JSON.stringify(existingPosts));

    /*     console.log("who like it:", existingPosts[postIndex].likedBy);
    console.log(
      "who:",
      existingPosts[postIndex].likedBy.join(", "),
      "where",
      postIndex
    ); */

    showWhoLiked(postIndex, existingPosts[postIndex].likedBy.join(", "), true);
  } else {
    console.log("Invalid postIndex:", postIndex);
  }
};

const whoLikedtheComment = (parentIndex, commsIndex, logedInUser) => {
  console.log(parentIndex, commsIndex);
  existingComms = JSON.parse(localStorage.getItem("madeCommByusers")) || [];
  if (isLoggedIn()) {
    // Filter the likedComms array to only include likes for the specified comment
    likesForcomms = likedComms.filter((like) => like.postIndex === commsIndex);
    // Log who liked the comment
    for (let like of likesForcomms) {
      // console.log("who liked:", logedInUser, "what he liked:", parentIndex);
      if (
        existingComms[like.postIndex] &&
        Array.isArray(existingComms[like.postIndex].likedBy)
      ) {
      } else {
        console.log(
          "like.likedBy is not an array or existingComms[like.postIndex] is undefined"
        );
      }
    }
    existingComms[parentIndex].likedBy.push(logedInUser);
    // existingComms[commsIndex].likedBy.push(logedInUser);
    // console.log("who like it:", existingComms[commsIndex].likedBy);
    let commParent = document.querySelectorAll(".postsContent")[parentIndex];
    let commContent = commParent.querySelectorAll(".commContent")[commsIndex];
    localStorage.setItem("madeCommByusers", JSON.stringify(existingComms));
    console.log(
      "elm",
      commContent,
      "who:",
      existingComms[commsIndex].likedBy,
      "where",
      commsIndex
    );
    showWhoLiked(
      commsIndex,
      existingComms[commsIndex].likedBy,
      false,
      commContent
    );
  } else {
    alert("you sould signup or login in order to like");
  }
};
const creatComment = (comment) => {
  let postParent =
    document.querySelectorAll(".postsContent")[comment.postIndex];
  commContainers = document.createElement("div");
  commContainers.classList.add("commContainerTemp");
  let commContent = document.createElement("div");
  commContent.classList.add("commContentTemp");
  if (!isLoggedIn()) {
    commContent.innerHTML = `<input class="commentInput" placeholder="you are not logged in please log in" disabled><br>
<button class="comment">
  <svg
    width="64px"
    height="21px"
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title>comment-4</title> <desc>Created with Sketch Beta.</desc>
      <defs> </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        sketch:type="MSPage"
      >
        
        <g
          id="Icon-Set"
          sketch:type="MSLayerGroup"
          transform="translate(-308.000000, -255.000000)"
          fill="#000000"
        >
          
          <path
            d="M327.494,279.633 L324,284 L320.506,279.633 C314.464,278.355 309.992,273.863 309.992,268.501 C309.992,262.146 316.264,256.994 324,256.994 C331.736,256.994 338.008,262.146 338.008,268.501 C338.008,273.863 333.536,278.355 327.494,279.633 L327.494,279.633 Z M324,255 C315.163,255 308,261.143 308,268.72 C308,274.969 312.877,280.232 319.542,281.889 L324,287.001 L328.459,281.889 C335.123,280.232 340,274.969 340,268.72 C340,261.143 332.837,255 324,255 L324,255 Z"
            id="comment-4"
            sketch:type="MSShapeGroup"
          >
            
          </path>
        </g>
      </g>
    </g>
  </svg>
</button>`;
  } else {
    commContent.innerHTML = `<input class="commentInput" placeholder="${comment.whoWantToComment} what would you like to comment?"><br>
<button class="comment">
  <svg
    width="64px"
    height="21px"
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title>comment-4</title> <desc>Created with Sketch Beta.</desc>
      <defs> </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        sketch:type="MSPage"
      >
        
        <g
          id="Icon-Set"
          sketch:type="MSLayerGroup"
          transform="translate(-308.000000, -255.000000)"
          fill="#000000"
        >
          
          <path
            d="M327.494,279.633 L324,284 L320.506,279.633 C314.464,278.355 309.992,273.863 309.992,268.501 C309.992,262.146 316.264,256.994 324,256.994 C331.736,256.994 338.008,262.146 338.008,268.501 C338.008,273.863 333.536,278.355 327.494,279.633 L327.494,279.633 Z M324,255 C315.163,255 308,261.143 308,268.72 C308,274.969 312.877,280.232 319.542,281.889 L324,287.001 L328.459,281.889 C335.123,280.232 340,274.969 340,268.72 C340,261.143 332.837,255 324,255 L324,255 Z"
            id="comment-4"
            sketch:type="MSShapeGroup"
          >
            
          </path>
        </g>
      </g>
    </g>
  </svg>
</button>`;
  }

  window.addEventListener("loginStatusChanged", (event) => {
    let commentInputs = document.querySelectorAll(".commentInput");
    commentInputs.forEach((input) => {
      if (event.detail.loggedIn) {
        // If the user is logged in
        input.placeholder = `${event.detail.user} what would you like to comment?`;
        input.disabled = false;
      } else {
        // If the user is not logged in
        input.placeholder = "you are not logged in please log in";
        input.disabled = true;
      }
    });
  });
  commContainers.appendChild(commContent);
  if (postParent) {
    postParent.appendChild(commContainers);
  }
  addCommentEventListeners();
};
const addLikeEventListeners = (post) => {
  let likeBtn = document.getElementsByClassName("like");
  if (post) {
    for (let i = 0; i < likeBtn.length; i++) {
      // Remove all previous event listeners
      let cloneLike = likeBtn[i].cloneNode(true);
      likeBtn[i].parentNode.replaceChild(cloneLike, likeBtn[i]);

      // Add new event listener
      cloneLike.addEventListener("click", () => {
        // console.log("who liked:", logedInUser, "what he liked:", cloneLike);
        let postIndex = Array.from(
          document.getElementsByClassName("like")
        ).indexOf(cloneLike);
        if (isLoggedIn()) {
          likedPosts.push(new Likes(logedInUser, postIndex));
          localStorage.setItem("likes", JSON.stringify(likedPosts));
          whoLikedthePost(postIndex, logedInUser);
        } else {
          alert("you sould signup or login in order to like");
        }

        // console.log(likes);
      });
    }
  } else {
    let likeCommsBtn = document.getElementsByClassName("likeOnComment");
    for (let i = 0; i < likeCommsBtn.length; i++) {
      // Remove all previous event listeners
      let cloneLike = likeCommsBtn[i].cloneNode(true);
      likeCommsBtn[i].parentNode.replaceChild(cloneLike, likeCommsBtn[i]);

      // Add new event listener
      cloneLike.addEventListener("click", () => {
        let postIndex = Array.from(
          document.getElementsByClassName("postsContent")
        ).indexOf(cloneLike.closest(".postsContent"));
        let commsIndex = Array.from(
          cloneLike
            .closest(".postsContent")
            .getElementsByClassName("likeOnComment")
        ).indexOf(cloneLike);
        likedComms.push(new Likes(logedInUser, commsIndex, postIndex));
        localStorage.setItem("comms", JSON.stringify(likedComms));
        console.log(commsIndex, logedInUser);
        whoLikedtheComment(postIndex, commsIndex, logedInUser);
      });
    }
  }
};
const addCommentEventListeners = () => {
  let commentBtn = document.getElementsByClassName("comment");
  let commParent = document.querySelectorAll(".commentInput");
  for (let i = 0; i < commentBtn.length; i++) {
    // Remove all previous event listeners
    let cloneComm = commentBtn[i].cloneNode(true);
    commentBtn[i].parentNode.replaceChild(cloneComm, commentBtn[i]);
    // Add new event listener

    cloneComm.addEventListener("click", (event) => {
      console.log(event);
      if (logedInUser) {
        let parentIndex = Array.from(
          document.getElementsByClassName("postsContent")
        ).indexOf(cloneComm.closest(".postsContent"));
        console.log("parent:", parentIndex);
        let commToPost = new Comments(
          logedInUser,
          commParent[i].value,
          i,
          [],
          parentIndex
        );
        // console.log(existingComms);
        existingComms.push(commToPost);
        localStorage.setItem("madeCommByusers", JSON.stringify(existingComms));
        createPermanentComms(commToPost);
      }
    });
  }
};

const createPosts = (existingPosts, index) => {
  postsContainers = document.createElement("div");
  postsContainers.classList.add("postsContainer");
  let postContent = document.createElement("div");
  postContent.classList.add("postsContent");
  postContent.innerHTML = `<h6 class="whoShared">${existingPosts.userName} shared this:</h6>
 <h2 class="status">${existingPosts.status}</h2>
 <button class="like"><svg width="64px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></butoon>`;
  postsContainers.appendChild(postContent);
  postSection.appendChild(postsContainers);
  let newComment = new NewComments(logedInUser, index);
  // console.log(newComment);
  creatComment(newComment);
  showWhoLiked(index, existingPosts.likedBy, true);
};
const createPermanentComms = (existingComms, index) => {
  let postParent =
    document.querySelectorAll(".postsContent")[existingComms.whereLocated];
  commContainers = document.createElement("div");
  commContainers.classList.add("commContainer");
  let commContent = document.createElement("div");
  commContent.classList.add("commContent");
  commContent.innerHTML =
    commContent.innerHTML = `<h6 class="whoShared">${existingComms.userName} commented this:</h6>
 <h2 class="status">${existingComms.status}</h2>
 <button class="likeOnComment"><svg width="64px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></butoon>`;
  commContainers.appendChild(commContent);
  if (postParent) {
    postParent.appendChild(commContainers);
  }
  addLikeEventListeners(false);
  console.log(index, existingComms.likedBy, false, commContent);
  showWhoLiked(index, existingComms.likedBy, false, commContent);
};
shareButton.addEventListener("click", () => {
  if (isLoggedIn()) {
    numOfPost = JSON.parse(localStorage.getItem("numOfPosts")) || 0;
    if (user_status.value) {
      let post = new Posts(logedInUser, user_status.value, []);
      createPosts(post, numOfPost);
      numOfPost++;
      localStorage.setItem("numOfPosts", JSON.stringify(numOfPost));
      // Retrieve existing posts from local storage or create an empty array
      existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
      // Add the new post to the array
      existingPosts.push(post);
      // Save the updated post array back to local storage
      localStorage.setItem("posts", JSON.stringify(existingPosts));
      console.log("ok:", existingPosts);
      user_status.value = "";
    }
    addLikeEventListeners(true);
    addLikeEventListeners(false);
    addCommentEventListeners();
  }
});
window.addEventListener("load", () => {
  existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
  existingComms = JSON.parse(localStorage.getItem("madeCommByusers")) || [];
  // console.log(existingComms);
  likedPosts = JSON.parse(localStorage.getItem("likes")) || [];
  likedComms = JSON.parse(localStorage.getItem("comms")) || [];
  for (let i = 0; i < existingPosts.length; i++) {
    createPosts(existingPosts[i], i);
  }
  for (let i = 0; i < existingComms.length; i++) {
    createPermanentComms(existingComms[i], i);
  }
  addLikeEventListeners(true);
  addLikeEventListeners(false);
  addCommentEventListeners();
});
