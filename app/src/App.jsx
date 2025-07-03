import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchResult from './components/SearchReasult/SearchResult'

export const BASE_URL = "http://localhost:9000"

const App = () => {

  const [data, setData] = useState(null);
  const [fileredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState('all');
 

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try{
      const response = await fetch(BASE_URL);
       const json = await response.json();
       setData(json);
       setFilteredData(json);
       setLoading(false);
      } catch (error) {
       setError('Failed to fetch data');
      }
    }
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if(searchValue === "") {
      setFilteredData(null);
    }
      const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
     
    setFilteredData(filter);
  }

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton('all');
    } else {
      const filter = data?.filter((food) => food.type.toLowerCase() === type.toLowerCase());
      setFilteredData(filter);
      setSelectedButton(type);
    }
  }

  const filterButtons = [
    {name: 'All', type: 'all'},
    {name: 'Breakfast', type: 'breakfast'},
    {name: 'Lunch', type: 'lunch'},
    {name: 'Dinner', type: 'dinner'},
  ];

  if(error) return <div>{error}</div>;
  if(loading) return <div>Loading...</div>;


  return (
    <>
    <Container>
        <TopContainer>
           <div className='logo'>
            <img src="/images/logo.svg" alt="logo-img" />
           </div>
           <div className='search'>
                <input onChange={searchFood} placeholder='Search Food' />
            </div>
        </TopContainer>
        <FileterContainer>
          {filterButtons.map((value) => (
            <Button 
            isSelected={selectedButton === value.type}
              key={value.name} 
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FileterContainer>
        
    </Container>
    <SearchResult data={fileredData} />
    </>
  )
}

export default App

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

`

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px ;
  align-items: center;
  
  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
    @media (0 < width < 600px) {
     flex-direction: column;
     height: 120px;
}
`



const FileterContainer = styled.section` 
   display: flex;
   justify-content: center;
   gap: 12px;
`

export const Button = styled.button`
  background-color:${({isSelected}) => (isSelected ?  "#f22f2f" : "#ff4343")} ;
  outline: 1px solid ${({isSelected}) => (isSelected ? "white" : "none")};
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }


`

