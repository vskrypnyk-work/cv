const settingsBtn=document.querySelector(".settings-btn"),settingsMenu=document.getElementById("settings-menu"),showSecondsCheckbox=document.getElementById("show-seconds"),toggle24hCheckbox=document.getElementById("toggle-24h");function updateClock(){let e=new Date,t=e.getHours(),c=e.getMinutes(),o=e.getSeconds(),s=t>=12?"PM":"AM";toggle24hCheckbox.checked||(t=t%12||12),c=c<10?"0"+c:c,o=o<10?"0"+o:o;let n=toggle24hCheckbox.checked?`${t}:${c}${showSecondsCheckbox.checked?":"+o:""}`:`${t}:${c}${showSecondsCheckbox.checked?":"+o:""} ${s}`;document.querySelector(".clock").innerText=n}function saveSettings(){localStorage.setItem("showSeconds",showSecondsCheckbox.checked),localStorage.setItem("toggle24h",toggle24hCheckbox.checked)}function loadSettings(){let e="true"===localStorage.getItem("showSeconds"),t="true"===localStorage.getItem("toggle24h");showSecondsCheckbox.checked=e,toggle24hCheckbox.checked=t}settingsBtn.addEventListener("click",()=>{settingsMenu&&(settingsMenu.style.display="block")}),showSecondsCheckbox.addEventListener("change",()=>{saveSettings(),updateClock()}),toggle24hCheckbox.addEventListener("change",()=>{saveSettings(),updateClock()}),loadSettings(),updateClock(),setInterval(updateClock,1e3);