
var audioPlayer = document.getElementById("audioPlayer");
function addRightContent() {
  var rightContent = document.getElementById('right-content');
  rightContent.classList.remove('view2');
  rightContent.classList.add('view1');
}

function Rightremove() {
  var rightContent = document.getElementById('right-content');
  rightContent.classList.remove('view1');
  rightContent.classList.add('view2');
}
var cardsData = [
  {
    id: "Anger",
    imageSrc: "songs/Anger/cover.jpg",
    title: "Anger"
  },
  {
    id: "Chill",
    imageSrc: "songs/Chill/cover.jpg",
    title: "Chill"
  },

  {
    id: "Diljit",
    imageSrc: "songs/Diljit/cover.jpg",
    title: "Diljit"
  },
  {
    id: "funk",
    imageSrc: "songs/funk/cover.jpg",
    title: "Funk"
  }
];





async function fetchCardData(categoryId) {
  removeAllCards();

  const category = cardsData.find(card => card.id === categoryId);
  if (!category) {
    console.error(`${categoryId} category not found in cardsData.`);
    return;
  }

  const categoryCoverSrc = category.imageSrc;
  const categoryCoverPath = categoryCoverSrc.slice(0, categoryCoverSrc.indexOf("/cover"));
  const infoJsonPath = `${categoryCoverPath}/info.json`;

  try {
    const response = await fetch(infoJsonPath);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    let list = document.getElementById("list");
    if (!list) {
      list = document.createElement("div");
      list.id = "list";
      document.body.appendChild(list);
    }

    const ul = document.createElement("ul");

    ul.style.width = "100%";
    ul.style.margin = "auto";
    ul.style.listStyle = "none";

    data.forEach(song => {
      var number = song.number;
      const li = document.createElement("li");


      const playButton = document.createElement("button");

      playButton.className = "play-button";
      playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>';


      

      playButton.addEventListener("click", () => {

        var onsong = document.createElement('div')



        function p(number) {

          onsong.innerHTML = '';


          onsong.id = "onSong";
          onsong.style.position = "absolute";
          onsong.style.bottom = "120px";
          onsong.style.zIndex = "1";
          onsong.style.color = 'black'
          onsong.style.display = "flex";
          onsong.style.alignItems = "center";
          onsong.style.justifyContent = "center";
          onsong.style.backgroundColor = "chartreuse";
          onsong.style.height = "60px";
          onsong.style.border = "1px solid yellow";


          const songInfoDiv = document.createElement('div');
          onsong.innerHTML += `<img id="prev" src="/img/prev.png" alt="" style="height:30px;position:absolute; left:150px;;" />`
          songInfoDiv.textContent = `Song playing: ${data[number].title}`;
          onsong.innerHTML += `<img id="next" onclick="nextt( )" src="/img/next.png" alt=""  style="height:30px; position:absolute; right:150px;"/>`

          onsong.appendChild(songInfoDiv);


          document.body.appendChild(onsong);
        }


        p(number);









        audioPlayer.src = `/songs/${category.id}/${data[number].title}.mp3`
        audioPlayer.addEventListener('ended', () => {

          audioPlayer.src = `songs/${category.id}/${data[++number].title}.mp3`
          p(number);
          audioPlayer.play()

        })
        console.log("Playing:", song.title);
      });


      li.appendChild(playButton);


      const titleSpan = document.createElement("span");
      titleSpan.textContent = "song:" + song.title;
      li.appendChild(titleSpan);
      li.style.color = "black"
      li.style.fontWeight = "600"
      li.style.backgroundColor = "chartreuse"
      li.style.borderRadius = "30px"

      li.style.border = "1px solid #131313";
      li.style.margin = "10px";
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.justifyContent = "center";
      playButton.style.position = "Absolute";
      playButton.style.left = "30px"
      li.style.height = "55px";
      li.style.padding = "5px";
      li.style.textAlign = "center";


      ul.appendChild(li);
    });

    list.appendChild(ul);
  } catch (error) {
    console.error('There was a problem fetching the JSON file:', error);
  }
}















function generateCards() {

  var cardContainer = document.getElementById("cardContainer");
  cardsData.forEach(function (cardData) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.id = cardData.id;

    card.innerHTML = `<img src="${cardData.imageSrc}" alt=""> ${cardData.title}`;


    card.onclick = function () {

      fetchCardData(`${card.id}`);

    };

    cardContainer.appendChild(card);
  });

  rem();
}



function rem() {
  let list = document.getElementById("list")
  list.innerHTML = ''

  return;
}



function removeAllCards() {
  var cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
}


