refactoring html to jsx
    %PUBLIC_URL%/ in front of link when linking styles.css, s  yntax may be coming from bundler  
    
    style.css calls via imports all other
    Problem with that is that there a requests for each component css,
    React way is to make all of them be dynamic rather than static and imported via straighforward script.

wrap App in BrowserRouter in index.js and then add Routes/Route logic to App.js 

export { default } from './Home' in index.js for no /Home/Home

2:36:00