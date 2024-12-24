const getTime = (time) => {
	// get hour and rest second
	const hour = parseInt(time / 3600);
	const restSecond = time % 3600;
	const minute = parseInt(restSecond / 60);
	const finalSecond = restSecond % 60;
	return ` ${hour} hour ${minute} minute ${finalSecond} second ago`
}
//1 fetch, load and show  Catagories on html
//create loadCategories
const loadCategories = () => {
	// console.log("loadCategories created");
	// fetch the data
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		.then((res) => res.json())
		.then((data) => displayCategoies(data.categories))
		.catch((error) => console.log(error));
};
const loadvideos = () => {
	// console.log("loadCategories created");
	// fetch the data
	fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
		.then((res) => res.json())
		.then((data) => displayVideos(data.videos))
		.catch((error) => console.log(error));
};
const loadCategoryVideos = (id) => {
	// alert(id)
	fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
		.then((res) => res.json())
		.then((data) => displayVideos(data.category));
}
// const cardDemo = {
// 	"category_id": "1001",
// 	"video_id": "aaab",
// 	"thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
// 	"title": "Midnight Serenade",
// 	"authors": [
// 		 {
// 			  "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
// 			  "profile_name": "Noah Walker",
// 			  "verified": false
// 		 }
// 	],
// 	"others": {
// 		 "views": "543K",
// 		 "posted_date": ""
// 	},
// 	"description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }
const displayVideos = (videos) => {
	// console.log(videos);
	const videoContainer = document.getElementById("videos");
	videoContainer.innerHTML = "";
	if(videos.length == 0){
		videoContainer.classList.remove("grid");
		videoContainer.innerHTML = `
		<div class ="min-[300px] flex flex-col gap-5 justify-center items-center" >
			<img src="/assets/Icon.png" alt="">
			<h2 class =" text-xl text-center font-bold" >
			No content Here in this Categoies
			</h2>
		</div>
		`;
		return;
	}
	else{
		videoContainer.classList.add("grid")
	}
	videos.map((video) => {
		// console.log(video);
		const card = document.createElement("div");
		card.classList = "card card-compact"
		card.innerHTML = `
		 <figure class ="h-48 relative">
    <img
      src="${video.thumbnail}"
		class ="h-full w-full object-cover"
      alt="Shoes" />
		${video.others.posted_date?.length == 0 ? "" : `<span class= "absolute right-2 text-xs bottom-2 text-white bg-black rounded p-1" >${getTime(video.others.posted_date)}`}
		<span>
  </figure>
  <div class=" px-0 py-2 flex gap-2">
    <div>
	 <img class=" w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>
    <div>
	 <h2 class="font-bold" >${video.title}
	 </h2>
	 <div class= "flex items-center gap-2">
 <p class="text-gray-400" >${video.authors[0].profile_name}
	 </p>
	 ${video.authors[0].verified === true ? `<img class="w-5 object-cover " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
    </div>
     <p>
	 </p>
  </div>
		`;
		videoContainer.append(card);
	});
};
// category:"Music"
// category_id:"1001"

// create DisplayCategories
const displayCategoies = (categoies) => {
	const categoryContainer = document.getElementById("categories");
	categoies.map((item) => {
		// console.log(item);
		//create a button
		const buttonContainer = document.createElement("div");
		buttonContainer.innerHTML = `
		<button onclick = "loadCategoryVideos(${item.category_id})" class="btn" >
			${item.category}
		</button>	`
		// add button to category container
		categoryContainer.append(buttonContainer);
	});
};
loadCategories();
loadvideos();
