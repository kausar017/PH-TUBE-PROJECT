
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let secend = time % 3600;
    let minit = parseInt(secend / 60);
    secend = secend % 60;
    return `${hour} hour ${minit} minit ${secend} secend ago`;
}


const removeActivClass = () => {
     const button= document.getElementsByClassName('catagory-btn');
     console.log(button);
     for(let btn of button) {
        btn.classList.remove('active');
     }
       
}

// fatch, load and show catagoris on html
// create load catagoris
const loadCatagoris = () => {
    // fatch the data 

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCatagoris(data.categories))
        .catch(error => console.log(error))
}
// create load catagoris
const loadVideos = (searchText = "") => {
    // fatch the data 
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const loodCatagoryVideo = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then(data => {
            removeActivClass();
            const activeBtn = document.getElementById(`btn${id}`);
            activeBtn.classList.add('active')
            console.log(activeBtn);
            displayVideos((data.category))
        })
        .catch(error => console.log(error))
}


const loadDitals = async(videoId) => {
    // console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const response = await fetch(uri);
    const data = await response.json();
    displayDitals(data.video);
    
}

const displayDitals = (video) => {
    console.log(video);
    const ditelsContainer = document.getElementById('openModal');
    
    ditelsContainer.innerHTML = 
    `
        <img class="w-full h-full object-cover" src=${video.thumbnail}/>
        <p class="p-3 text-gray-500 text-center">${video.description}</p>
    `

    document.getElementById('showModal').click();
}
// {
//     "category_id": "1001",
//     "category": "Music"
//   },

// const cardDemo = {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


// Create DisplayVideos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML= "";
    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML =
            `
           <div class="min-h[600px] w-[800px] m-auto text-center flex flex-col gap-5 justify-center items-center">
                <img src="./icon.png"/>
                <h1 class="font-bold text-6xl ">Oops!! Sorry, There is no content here </h1>
           </div> 
        `;
        return;
    } else {
        videoContainer.classList.add("grid")

    }

    videos.forEach(video => {
        // console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML =
            `
        <figure class="h-[200px] relative">
            <img  src=${video.thumbnail}class= "w-full h-full object-cover" alt="Shoes"/>
            ${video.others.posted_date?.length == 0 ? "" :
                `
                    <span class="absolute bg-black text-white text-xs p-1 rounded-xl bottom-2 right-2">
                    ${getTimeString(video.others.posted_date)}
                    </span>
                `
            } 
                       
         </figure>

        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class= "w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
            </div>
            <div>
                <h2 class= "font-bold">${video.title}</h2>
                <div class="flex flex-row items-center gap-3">
                    <p class="text-gray-500">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified == true ? `<img class="w-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : `<img class="w-4" src="https://img.icons8.com/?size=48&id=fYgQxDaH069W&format=png"/>`}
                </div>
                <p class="text-gray-500">${video.others.views}views</p>

                <p><button onclick="loadDitals('${video.video_id}')" class="btn btn-sm btn-error text-white">detals</button></p>
            </div>
        </div>   
        `;
        videoContainer.appendChild(card);
    })

}


//create Display catagiris

const displayCatagoris = (catagiris) => {
    const catagirisContainer = document.getElementById("categories");


    //add data in html
    catagiris.forEach((item) => {
        // console.log(item);
        //creat a button 
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
        `
            <button id="btn${item.category_id}" onclick="loodCatagoryVideo(${item.category_id})" class= "btn catagory-btn">
                ${item.category}
            </button>
        `

        //add button to catagory container
        catagirisContainer.append(buttonContainer);
    });


}
document.getElementById('search-input').addEventListener('keyup', (e)=> {
    loadVideos(e.target.value);
    
})


loadCatagoris();
loadVideos();