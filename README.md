# WhatsWrong

## Website is divided into three sections with a README.md provided for each on how to run the program locally:
1. Frontend
2. Backend
3. Android

## Folder Organization

### Front-End

- /frontend
  - /public
  	- /images (It is conventional to place images in the public folder. We used these images in src/Modals)
  	  - dict-1.png
  	  - dict-2.png
  	  - dict-3.png
  	  - simp-search-1.png
  	  - simp-search-2.png
  	  - simp-search-3.png
  	  - smart-search-1.png
  	  - smart-search-2.png
  	- favicon.ico (This is the icon used for the title of the page)
  	- index.html (Default HTML file when creating React app. In here, we changed the title of the page, added javascript script tags for Bootstrap Modal, and added our Google font.)
  	- manifest.json (Default React file)
  - src (This is the folder that contains React code)
  	- /Components
  	  - 
  	- App.test.js (Default React File. Used to make sure the page crashes with an error so that error can be analyzed and fixed.)
  	- history.js (Allows for programmer to create separate URLS. Can keep the file as is.)
  	- index.css (Default CSS file when creating React app.)
  	- index.js (Default index.js file created with React app. Here, we can add more pages for the website using the Route tag.)
  	- registerServiceWorker.js
  - README.md (Detailed step-by-step process on how to run the front-end locally)