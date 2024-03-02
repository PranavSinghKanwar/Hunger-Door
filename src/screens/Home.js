import React, { useState , useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async function(){
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar/>
      <div
        id="carouselExampleFade"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit:"contain !important"}}
      >
        <div class="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => (setSearch(e.target.value))}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>

          <div class="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?burger"
              class="d-block w-100"
              alt="..."
              style={{filter:"brightness(40%)", objectFit:"contain"}}
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pizza"
              class="d-block w-100"
              alt="..."
              style={{filter:"brightness(40%)", objectFit:"contain"}}
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pastry"
              class="d-block w-100"
              alt="..."
              style={{filter:"brightness(40%)", objectFit:"contain"}}
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {
          foodCat != []?foodCat.map((data)=>{
            return(
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem != []? foodItem.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map(filteredItems => {
                  return (
                    <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card itemName={filteredItems.name}
                        options={filteredItems.options[0]}
                        imgSrc={filteredItems.img}
                        desc={filteredItems.description}
                      />
                    </div>
                  )
                })
                : <div>No such data found</div>}
              </div>
              )
          }):""
        }
      </div>
      <Footer />
    </div>
  )
}

export default Home
