import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { catService} from "./service/api";

const UI = {
    cats: {
      $container: document.querySelector("[data-content=cats]"),
    },
  };


async function init() {
    console.log("init function");
    populateCats();

    //addEventListeners();
    const formElem = document.querySelector("form");
    formElem.addEventListener("submit", (e) => {
      // on form submission, prevent default
      e.preventDefault();
      const formData = new FormData(formElem);
      // formdata gets modified by the formdata event
      const paging_input = formData.get("paging_input"); // foo
      const breeds_input = formData.get("breeds_input"); // bar
      
      console.log(breeds_input);
      console.log(paging_input);
      populateCats(paging_input,breeds_input);
    });
    
}


  

  async function populateCats(limit=5,breed_ids="") {
    //debugger;
    // if(!region){
    //     console.error("Region is required.");
    // return;
    // }
    try {
        const cats = await catService.getRandomCats(limit,breed_ids);
        
        
        // Here you can update the UI with the countries data.
        await displayCats(cats);
      } 
      catch (error) 
      {
        console.error("Error fetching cats:", error);
      }
    
  }


  async function displayCats(cats) {
  if(!UI.cats.$container){
      console.error("Cat container not found");
      return;
  }
  console.log(cats);
  const catsToHtml = ({height, id, url, width}) => {
    return `
      <li data-id=${id}>
        <img width=${width} height=${height} src=${url} />
      </li>
    `;
  };
  
  const htmlCats = cats.map(catsToHtml);
  console.log(htmlCats);
  console.log(UI.cats);
  UI.cats.$container.innerHTML =  htmlCats.join("");  
}



init();