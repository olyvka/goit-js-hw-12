import{a as x,S,i as d}from"./assets/vendor-527658dd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();async function g(t,a){const n="https://pixabay.com/api",i=new URLSearchParams({key:"42450434-3c949e4f0cfd845cc919e9207",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15});return(await x.get(`${n}/?${i}&q=${t}&page=${a}`)).data}function p(t){return t.map(({webformatURL:a,largeImageURL:n,tags:i,likes:e,views:r,comments:c,downloads:w})=>`<li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img class="gallery-image" src="${a}" alt="${i}" />
        </a>
        <div class="container-additional-info">
          <div class="container-descr-inner">
            <p class="description">Likes</p>
            <span class="description-value">${e}</span>
          </div>
          <div class="container-descr-inner">
            <p class="description">Views</p>
            <span class="description-value">${r}</span>
          </div>
          <div class="container-descr-inner">
            <p class="description">Comments</p>
            <span class="description-value">${c}</span>
          </div>
          <div class="container-descr-inner">
            <p class="description">Downloads</p>
            <span class="description-value">${w}</span>
          </div>
        </div>
      </li>`).join("")}const s={formSearch:document.querySelector(".form"),imageList:document.querySelector(".gallery"),preload:document.querySelector(".loader"),nextBtn:document.querySelector("#next-btn")},o="is-hidden";let l=0,u="";const m=new S(".gallery a",{captionsData:"alt",captionDelay:250});s.formSearch.addEventListener("submit",b);async function b(t){t.preventDefault();const a=t.currentTarget.elements.input.value.trim(),n=t.currentTarget;if(u=a,l=1,s.nextBtn.classList.add(o),s.imageList.innerHTML="",!a){d.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topRight",timeout:3e3});return}s.preload.classList.remove(o);try{const i=await g(u,l);if(i.hits.length===0){d.show({iconUrl:icon,theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),n.reset();return}s.imageList.innerHTML=p(i.hits),m.refresh(),i.hits.length>=15&&v(),h(),n.reset()}catch(i){y(i)}finally{s.preload.classList.add(o)}}function y(t){console.error(t),s.imageList.innerHTML="",d.show({iconUrl:icon,theme:"dark",message:t.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),f()}async function L(){s.preload.classList.remove(o),f(),l+=1;try{const t=await g(u,l);if(l*15>=t.totalHits){d.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#4e75ff",position:"topRight",timeout:5e3}),s.imageList.innerHTML+=p(t.hits),m.refresh(),f(),h();return}s.imageList.innerHTML+=p(t.hits),m.refresh(),h(),v()}catch(t){y(t)}finally{s.preload.classList.add(o)}}function h(){window.scrollBy({top:640,behavior:"smooth"})}function v(){s.nextBtn.classList.remove(o),s.nextBtn.addEventListener("click",L)}function f(){s.nextBtn.classList.add(o),s.nextBtn.removeEventListener("click",L)}
//# sourceMappingURL=commonHelpers.js.map
