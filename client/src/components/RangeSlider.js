// import React from 'react'
// import './RangeSlider.css'

// function RangeSlider() {
//   return (
   
//     <div class="container">
//                   <div slider id="slider-distance">
//                   <div>
//                     <div inverse-left style="width:70%;"></div>
//                     <div inverse-right style="width:70%;"></div>
//                     <div range style="left:30%;right:40%;"></div>
//                     <span thumb style="left:30%;"></span>
//                     <span thumb style="left:60%;"></span>
//                     <div sign style="left:30%;">
//                       <span id="value">30</span>
//                     </div>
//                     <div sign style="left:60%;">
//                       <span id="value">60</span>
//                     </div>
//                   </div>
//                   <input type="range" tabindex="0" value="30" max="100" min="0" step="1" oninput={
//                   this.value=Math.min(this.value,this.parentNode.childNodes[5].value-1);
//                   var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);
//                   var children = this.parentNode.childNodes[1].childNodes;
//                   children[1].style.width=value+'%';
//                   children[5].style.left=value+'%';
//                   children[7].style.left=value+'%';children[11].style.left=value+'%';
//                   children[11].childNodes[1].innerHTML=this.value;} />
                
//                   <input type="range" tabindex="0" value="60" max="100" min="0" step="1" oninput={
//                   this.value=Math.max(this.value,this.parentNode.childNodes[3].value-(-1));
//                   var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);
//                   var children = this.parentNode.childNodes[1].childNodes;
//                   children[3].style.width=(100-value)+'%';
//                   children[5].style.right=(100-value)+'%';
//                   children[9].style.left=value+'%';children[13].style.left=value+'%';
//                   children[13].childNodes[1].innerHTML=this.value} />
//                 </div>
//   </div>

 


   
//   )
// }

// export default RangeSlider
