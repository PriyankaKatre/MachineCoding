//1) Async/Await: "In async/await, await waits for the previous promise to fulfill before executing the next one."

//2) Then and Catch: "In the case of then and catch, I have pushed all the responses from fetch into an array one by one." And used Promise.all, which executes promises concurrently.

const getData = async (postNo) => {
    let url = `https://jsonplaceholder.typicode.com/posts/${postNo}`;
    let outputDiv = document.querySelector(".apiData");
    try {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error('Something wrong with api response')
        }
        let jsonRes = await res.json()
        outputDiv.innerHTML += `<div class='postTitle'>${postNo} --> ${jsonRes.title}</div>`;
    } catch (error) {
        console.log(error)
    }
}


const getDataOneByOne = async () => {
    for (let i = 0; i < 100; i++) {
      await getData(i);
    }
}
getDataOneByOne()

//Promise
const getDataFromAPi = (postNo) => {
  const api = `https://jsonplaceholder.typicode.com/posts/${postNo}`;

  return fetch(api)
    .then((res) => {
      if (!res.ok) {
        throw new Error("There is an issue in API response");
      }
      return res.json();
    })
    .then((jsonRes) => {
      return { postNo, title: jsonRes.title };
    })
    .catch((error) => {
      console.error("Fetch API Error:", error);
    });
};


const fetchDataUsingPromises = () => {
    let returnPromisesFromFetch =[];
    for (let i = 1; i <= 100; i++) {
        returnPromisesFromFetch.push(getDataFromAPi(i));
    }

  Promise.all(returnPromisesFromFetch)
    .then((responses) => {
      const outputDiv = document.querySelector(".apiData");
      responses.forEach(({ postNo, title }) => {
        outputDiv.innerHTML += `<div class='postTitle'>${postNo} --> ${title}</div>`;
      });
    })
    .catch((error) => {
      console.error("Fetch API Error:", error);
    });
};

fetchDataUsingPromises();


