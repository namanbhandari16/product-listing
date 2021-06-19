import products from './data/products.json'
import {useState,useEffect} from "react"
import {Card} from 'react-bootstrap'
import './App.css';
import Container from 'react-bootstrap/esm/Container';

function App() {
  function getSizeString(size){
    var str=""
    for(var i =0;i<size.length-1;i++){
      str=str+size[i]+", "
    }
    str=str+size[size.length-1];
    return str
  }
  function handleClear(){
    setFilter({})
  }

  function handleOnChange(name){
    const temp={...filter}
    if(temp.brand)
    { if(temp.brand.includes(name)) 
        temp.brand=temp.brand.filter(p=>p!=name)
      else temp.brand.push(name)}
    else temp.brand=[name]
    setFilter(temp)
    console.log(filter)
  }
function filterProd(){
  var res=products
    if(filter.brand && filter.brand.length>0){
      res=res.filter(p=>filter.brand.includes(p.brand))
      }
    if(filter.size){
      res=res.filter(p=>p.size.includes(filter.size))
    }
    if(filter.for){
      res=res.filter(p=>p.for==filter.for)
    }
    setData(res)
}
  function sortLToH(){
    setData(data.sort((a,b)=>a.price>b.price?1:-1))
    setTemp(0)
    console.log(data)
  }
  function sortHToL(){
    setData(data.sort((a,b)=>a.price>b.price?-1:1))
    setTemp(1)
    console.log(data)
  }

  function sortGender(event){
    const temp = {...filter}
    temp.for=event.target.value
    console.log(event.target.value)
    setFilter(temp)
  }

  const [filter,setFilter] = useState({})
  const [data,setData] = useState([])
  const [temp,setTemp] = useState(products)

  useEffect(()=>{
    filterProd()
  },[filter.brand,filter.for,data,temp,filter.size])

  return (
    <div className="App">
    <header><h2>Flipkart</h2></header>
    <div style={{display:'flex',flexFlow:'row'}}> 
      
      <div style={{display:'flex',flex:'0 0 280px',flexFlow:'column',textAlign:'left'}}>
        <section>
        <h4 style={{width:'100%',textAlign:'left',margin:'5%'}}>Filters<button onClick={handleClear} style={{background:'none',border:'none',color:'blue',float:'right'}}>CLEAR ALL</button></h4>
        </section>

        <section>
          <button style={{background:'none',border:'none',color:'blue'}} onClick={sortHToL}>Price - High to Low</button>
          <button style={{background:'none',border:'none',color:'blue'}} onClick={sortLToH}>Price - Low to High</button>
        </section>

        <br/>
        <section>
          <div onChange={sortGender}>
            <input type="radio" value="Men" name="gender"/> Male
            <input type="radio" value="Women" name="gender"/> Female
          </div>
        </section>

        <section style={{margin:'5%'}}>
        <h5>Brand</h5>
        <ul>
        <li><input type="checkbox" id="1" name="Colors" value="Colors" onChange={()=>handleOnChange("Colors")}/><label>Colors</label></li>
        <li><input type="checkbox" id="2" name="Adidas" value="Adidas" onChange={()=>handleOnChange("Adidas")}/><label>Adidas</label></li>
        <li><input type="checkbox" id="3" name="Fab" value="Fab" onChange={()=>handleOnChange("Fab")}/><label>Fab</label></li>
        <li><input type="checkbox" id="4" name="Montrez" value="Montrez" onChange={()=>handleOnChange("Montrez")}/><label>Montrez</label></li>
        </ul>
        </section>
      </div>
    
      <div xs={9} style={{display:'flex',flexGrow:'1',overflow:'auto'}}>
      <div className="product-grid">
      {data.length>0 && data.map((d)=>{
        return <Card key={d.id}>
        <Card.Img src={d.img}/>
        <Card.Body>
          <Card.Title>{d.name}</Card.Title>
          <Card.Text>Rs {d.price}<br/>
          Size: {getSizeString(d.size)}
          </Card.Text>
        </Card.Body>
        </Card>
      })}
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
