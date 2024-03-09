const loadData = async () =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json()
    displayLoadData(data.data.tools);
}


const displayLoadData = (univers) => {
    const cardContainer = document.getElementById('card-container')
    // console.log(univers)
    // cardContainer.innerHTML = '';
    
    // see more button handler
    const seeMoreBtn = document.getElementById('see-more')
        if(univers.length > 6){
            univers = univers.slice(0,6)
            seeMoreBtn.classList.remove('d-none')
        }
        else{
            seeMoreBtn.classList.add('d-none')
        }

    univers.forEach(element => {
        console.log(element.id)
        const cardDiv = document.createElement('div')
        cardDiv.classList = 'col'
        cardDiv.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <p class="card-text">1. ${element.features[0]}</p>
                        <p class="card-text">2. ${element.features[1]}</p>
                        <p class="card-text">3. ${element.features[2]}</p>
                        <hr>

                        
                        <div class="row">
                        <div class="col-lg-6">
                        <h5 class="card-title">${element.name}</h5>
                        <p>${element.published_in}</p>   
                        </div>

                        <div class="col-lg-6 text-end">
                        <button onclick ="loadModalData('${element.id}')" class= "btn btn-danger" data-bs-toggle="modal" data-bs-target="#details-modal">Details</button>
                              
                        </div>
                        </div>
                        

                    </div>
            </div>
            
        `
        cardContainer.appendChild(cardDiv)
    
        
    });

    toggoleLoader(false)
}



document.getElementById('see-more').addEventListener('click', function(){
    console.log('see more button clicked')
    toggoleLoader(true)
    loadData()
})



const toggoleLoader = isLoading => {
    const pageLoader = document.getElementById('page-loader')

    if(isLoading){
        pageLoader.classList.remove('d-none')
    }
    else{
        pageLoader.classList.add('d-none')
    }
}


// handle modal 
const loadModalData = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    showModalDetails(data.data)
} 


const showModalDetails = details => {
    console.log(details.logo)

    let modalDiv = document.getElementById('modal-body')
    modalDiv.innerHTML = `
        <div class="modal-card gap-4 d-flex">
            <div class="card border-danger bg-dang mb-3" style="max-width: 35rem;">
                <div class="card-body bgColor">
                    <h3 class="card-title ">${details.description}</h3>
                    <div class="row d-flex text-center justify-content-center aling-items-center mt-5 gap-2">
                        <div class="col-lg-3 box-highlight text-success">${details.pricing[0].price} <br> ${details.pricing[0].plan}</div>
                        <div class="col-lg-3 box-highlight text-warning">${details.pricing[1].price} <br> ${details.pricing[1].plan}</div>
                        <div class="col-lg-4 box-highlight text-danger">${details.pricing[2].price} <br> ${details.pricing[2].plan}</div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-lg-6">
                            <h5>Features</h5>
                            <li>${details.features[1].feature_name}</li>
                            <li>${details.features[2].feature_name}</li>
                            <li>${details.features[3].feature_name}</li>
                        </div>
                        <div class="col-lg-6">
                            <h5>Integrations</h5>
                            <li>${details.integrations[0]}</li>
                            <li>${details.integrations[1]}</li>
                            <li>${details.integrations[2]}</li>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="adjust-height">
                    <div class="" style="width: 25rem;">
                        <img src="${details.image_link[0]}" class="card-img-top" alt="...">
                        <div class="mt-4 text-center">
                            <h5 class="-title">${details.input_output_examples[0].input}</h5>
                            <p class="-text">${details.input_output_examples[0].output}</p>
                        </div>
                    </div>
                </div>
            </div>
    
    `


}









loadData()