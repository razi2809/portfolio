let form = document.getElementById("form1");
let searchHistory = [];
let btnPlace = document.getElementById("btnPlace");
let res = document.getElementById("res");
btnPlace.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "BUTTON") {
    // Check if the clicked element is a button
    res.innerHTML = "";

    const cityName = e.target.innerHTML;
    infoHandeling(cityName); // Call the function with the city name
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let { value: city } = document.getElementById("floatingInput");
  res.innerHTML = "";
  if (searchHistory.indexOf(city) === -1) {
    // Check if the city is not already in the search history
    creatBtn(city);
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  infoHandeling(city);
  document.getElementById("floatingInput").value = "";
});
const infoHandeling = (city) => {
  getWeather(city)
    .then((weather) => {
      let cityName = document.createElement("div");
      cityName.className = "cityName";
      cityName.innerHTML = `<h1 class="city">${city},${weather.sys.country}</h1> `;
      res.appendChild(cityName);
      let weatherimg = document.createElement("img");
      weatherimg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      );
      let areaInfo = document.createElement("p");
      let sunTime = document.createElement("div");
      let feels_like = document.createElement("div");
      let humidity = document.createElement("div");
      let temp_feels_likeValue = weather.main.feels_like;
      let temp_maxValue = weather.main.temp_max;
      let temp_MinValue = weather.main.temp_min;
      let tempInfo = document.createElement("div");
      let temp = document.createElement("div");
      let high_low = document.createElement("div");
      let tempValue = weather.main.temp;
      let sunset = convertUnixToHumanReadable(weather.sys.sunset);
      let sunrise = convertUnixToHumanReadable(weather.sys.sunrise);
      let timediv = displayLocalTime(weather.timezone);
      sunTime.className = "sunTime";
      areaInfo.className = "areaInfo";
      high_low.className = "high_low";
      temp.className = "currentTemp";
      tempInfo.className = "tempInfo";
      tempValue = Math.round(tempValue);
      areaInfo.setAttribute("id", "areaInfo");
      temp.innerHTML = `<h2>current temp:</h2><h3>${tempValue}<svg class="tempMetric" width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></h3>`;
      temp.appendChild(weatherimg);
      areaInfo.appendChild(timediv);
      areaInfo.appendChild(temp);
      res.appendChild(areaInfo);
      res.appendChild(tempInfo);
      temp_feels_likeValue = Math.round(temp_feels_likeValue);
      temp_maxValue = Math.round(temp_maxValue);
      temp_MinValue = Math.round(temp_MinValue);
      feels_like.innerHTML = `<h2>feels like:</h2><h3>${temp_feels_likeValue}<svg class="tempMetric" width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></h3>`;
      high_low.innerHTML = `<h2>higest temp:</h2><h3>${temp_maxValue}<svg class="tempMetric" width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></h3><h2>lowest temp:</h2><h3>${temp_MinValue}<svg class="tempMetric" width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></h3>`;
      tempInfo.appendChild(feels_like);
      humidity.innerHTML = `<h2>humidity:</h2><h3>${weather.main.humidity}<svg width="40px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z" fill="#58befe"></path> <path d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z" fill="#58befe"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z" fill="#58befe"></path> <path d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z" fill="#58befe"></path> </g></svg></h3>`;
      tempInfo.appendChild(high_low);
      tempInfo.appendChild(humidity);

      sunTime.innerHTML = `<h2>sunrise:</h2><h3>${sunrise}</h3>
      <h2>sunset:</h2><h3>${sunset}</h3>`;
      areaInfo.appendChild(sunTime);
    })
    .catch((error) => {
      // Handle errors here if needed
      console.error(error);
      res.innerHTML = `<h1 class="city">sorry ${error.response.data.message}<h1/>`;
    });
};
const displayLocalTime = (utcOffsetSeconds) => {
  let time = document.createElement("p");
  time.className = "currentTime";
  time.setAttribute("id", "currentTime");
  let currentTime = getrealTime(utcOffsetSeconds);
  time.innerHTML = `<h2>current time:</h2><h3>${currentTime}</h3>`;
  // Create an interval that runs every 10 seconds
  const intervalId = setInterval(() => {
    // Calculate the local time
    currentTime = getrealTime(utcOffsetSeconds);
    time.innerHTML = `<h2>current time:</h2><h3>${currentTime}</h3>`;
    // console.log(`Local Time: ${formattedLocalTime}`);
  }, 10000); // 10000 milliseconds = 10 seconds

  // Return the interval ID in case you want to clear the interval later
  return intervalId, time;
};
const convertUnixToHumanReadable = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
const getrealTime = (utcOffsetSeconds) => {
  localTime = new Date(new Date().getTime() + utcOffsetSeconds * 1000);

  formattedLocalTime = localTime.toLocaleTimeString("en-US", {
    timeZone: "Etc/GMT+0",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formattedLocalTime;
};
const getWeather = (city) => {
  return new Promise((resolve, reject) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a503f2ad0ee17cc91d03ce17ddb66ab&units=metric`;
    axios
      .get(url)
      .then(function (response) {
        // handle success
        resolve(response.data); // Resolve the promise with the data
      })
      .catch(function (error) {
        // handle error
        reject(error); // Reject the promise with the error
      });
  });
};
const creatBtn = (btnValue) => {
  let newBtn = document.createElement("button");
  newBtn.innerHTML = btnValue;
  newBtn.className = "btn btn-outline-primary";
  newBtn.setAttribute("id", "historyBtn");
  btnPlace.appendChild(newBtn);
};
window.addEventListener("load", () => {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log(searchHistory.length);
  if (searchHistory.length > 0) {
    btnPlace.innerHTML = "<h2>search history:</h2>";
    for (search of searchHistory) {
      creatBtn(search);
    }
  }
});
