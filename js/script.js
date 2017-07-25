var osagoModalWindowClose = document.getElementById("osago-modal-window-close");
var osagoModalWindow = document.getElementById("osago-modal-window");
var osagoButtonDriverId1 = document.getElementById("osago-button-driver-id1");
osagoModalWindowClose.onclick = function(){
	osagoModalWindow.style.display = "none";
	osagoModalWindow.style.opacity = "0";
};
osagoButtonDriverId1.onclick = function(){
	osagoModalWindow.style.display = "flex";
	osagoModalWindow.style.opacity = "1";
};