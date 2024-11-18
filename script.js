let input = document.querySelector(".input-box");
let searchbtn = document.querySelector(".search");



async function fetchImage(imageType) {
    try{

        let data = await fetch(`https://api.unsplash.com/photos/random?query=${imageType}&client_id=uFiqPK1pkusEf8Ew1Rq93yfDy-FroYGJbfAE8JmVaj8&count=10`);
        if(!data.ok){
            throw new Error(`Image not Found ${data.status}`);
        }

        let response = await data.json();

        return response;
    }catch(error){
        console.log("Error in fetching the image" , error);
        return null;
    }
    
}


searchbtn.addEventListener("click" , async () => {
    let inputValue = input.value.trim();

    if(inputValue === "") {
        alert("Please enter a valid input!");
        return;
    }

    let fetchedImage = await fetchImage(inputValue);

    if(fetchedImage && fetchedImage.length > 0) {
        let divContainer = document.createElement("div");
        divContainer.className = "image-stored";

        fetchedImage.forEach(imageurl => {
            let div = document.createElement("div");
            div.className = "image-div";

            let img = document.createElement("img");
            img.src = imageurl.urls.raw;
            img.alt = `Random image for ${inputValue}`;

            div.appendChild(img);
            divContainer.appendChild(div);
        });

        document.body.appendChild(divContainer);

        
        let searchMore = document.querySelector(".search-more");
        if (!searchMore) {

            
            searchMore = document.createElement("button");
            searchMore.className = "search-more";
            searchMore.textContent = "Search More";
            document.body.appendChild(searchMore);

            // Add event listener for the 'Search More' button
            searchMore.addEventListener("click", async () => {
                let moreImage = await fetchImage(inputValue);
                if (moreImage && moreImage.length > 0) {
                    let divMoreContainer = document.createElement("div");
                    divMoreContainer.className = "image-stored";

                    moreImage.forEach(imageurl => {
                        let divmore = document.createElement("div");
                        divmore.className = "image-div";

                        let moreImg = document.createElement("img");
                        moreImg.src = imageurl.urls.raw;
                        moreImg.alt = `Random image for ${inputValue}`;
                        divmore.appendChild(moreImg);

                        divMoreContainer.appendChild(divmore);
                    });

                    document.body.appendChild(divMoreContainer);
                }
            });
        }
    }
});