let input = document.querySelector(".input-box");
let searchbtn = document.querySelector(".search");
let searchMore = document.querySelector(".search-more");
let imageContainer = document.querySelector(".imageContainer");
let page = 1;

async function fetchImage(imageType) {
    let inputValue = input.value.trim();
    // Make an API request to Unsplash to fetch images based on the query and page

    let data = await fetch(`https://api.unsplash.com/photos/random?query=${imageType}&client_id=uFiqPK1pkusEf8Ew1Rq93yfDy-FroYGJbfAE8JmVaj8&count=10&page=${page}`);

    // Parse the response as JSON

    let response = await data.json();

    if (page === 1) {
        imageContainer.innerHTML = "";
    }

    response.forEach(imgurl => {
        let imgDiv = document.createElement("div");
        imgDiv.className = "image-div";

        let img = document.createElement("img");
        img.src = imgurl.urls.small;
        img.alt = imgurl.alt_description || "Image"; // Default alt text if missing

        // Create a link around the description
        let anchor = document.createElement("a");
        anchor.href = imgurl.links.html;  
        anchor.target = "_blank";         
        anchor.textContent = imgurl.alt_description || "View Original Image";  

        // Append the image and the anchor link to the div
        imgDiv.appendChild(img);
        imgDiv.appendChild(anchor);

        // Add the imageDiv to the container
        imageContainer.appendChild(imgDiv);
    });

    page++;
    if (page > 1) {
        searchMore.style.display = "block";
    }
}

searchbtn.addEventListener("click", (event) => {
    event.preventDefault();
    page = 1;
    fetchImage(input.value.trim());
});

searchMore.addEventListener("click", () => {
    fetchImage(input.value.trim());
});
