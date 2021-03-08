let mainDiv = document.getElementById("mainDiv");
let imgDiv = document.getElementById("imageDiv");

let page_no = 1;

window.onload = async () => {
  let data = [];
  await getData(page_no, data);
  data.map((e) => {
    let imageContent = document.createElement('div')
    let image = document.createElement("img");
    let author = document.createElement('p')
    image.className = "images";
    image.src = e.download_url;
    author.textContent = e.author;
    imageContent.append(image,author);
   imgDiv.append(imageContent)
  });
};

mainDiv.onscroll = async () => {
  let { scrollTop, clientHeight, scrollHeight } = mainDiv;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    let data = [];
    await getData(page_no, data);
    // console.log(data);
    data.map((e) => {
      let imageContent = document.createElement('div')
      let image = document.createElement("img");
      let author = document.createElement('p')
      image.className = "images";
      image.src = e.download_url;
      author.textContent = e.author;
      imageContent.append(image,author);
     imgDiv.append(imageContent)
    });
  }
};

const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - last > delay) {
      last = now;
      return fn(...args);
    }
  };
};

const getData = throttle(async (page, data) => {
  await fetch(`https://picsum.photos/v2/list?page=${page}&limit=25`)
    .then((res) => res.json())
    .then((res) => {
      data.push(...res);
      page_no++;
    })
    .catch((err) => console.log("Error:", err));
}, 1000);
