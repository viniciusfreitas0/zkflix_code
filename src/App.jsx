import React, {useEffect, useState} from 'react';

import Netflix_loading from './componentes/img/Netflix_loading.gif'

import './App.css';
import FeaturedMovie from './componentes/FeaturedMovie';
import Tmdb from './Tmdb';

import MovieRow from './componentes/MovieRow';
import Header from './componentes/Header';


export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featureddata, setfeatureddata] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);
useEffect(() =>{
 
  
 
  const loadAll = async () => {
   //pegando a lista total da netflix
   let list = await Tmdb.getHomeList();
   setMovieList(list);

   //pegando o Featured
   let originals = list.filter(i=>i.slug === 'originals');
   let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
   let chosen = originals[0].items.results[randomChosen];

   let choseninfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setfeatureddata(choseninfo);
  }
  loadAll();
}, []);

useEffect(() =>{
 const scroollListener = () => {
if(window.scrollY > 10){
  setblackHeader(true);
}else{
  setblackHeader(false)
}
 }
 window.addEventListener('scroll', scroollListener);
 return() => {
  window.removeEventListener('scroll', scroollListener);
 }
},[]);

  return(
    
    <div className='page'>

     <Header black={blackHeader} />
  
      {featureddata &&
        <FeaturedMovie item={featureddata} />
      }
    
      <section className='lists'>
        {movieList.map((item, key) => (
           <MovieRow  key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito por Vinicius de Freitas Ventura (ZK) <br />
        Direitos de Imagem para Netflix <br />
        dados pegos do site themoviedb.org
      </footer>
      {movieList.length <= 0 &&
      <div className='loading'>
        <img src={Netflix_loading} alt="Carregando" />
      </div>
      }
    </div>
   
    
  )
}
