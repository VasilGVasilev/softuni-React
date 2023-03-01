refactoring html to jsx
    %PUBLIC_URL%/ in front of link when linking styles.css, s  yntax may be coming from bundler  
    
    style.css calls via imports all other
    Problem with that is that there a requests for each component css,
    React way is to make all of them be dynamic rather than static and imported via straighforward script.

wrap App in BrowserRouter in index.js and then add Routes/Route logic to App.js 

export { default } from './Home' in index.js for no /Home/Home

2:36:00

This demo is client side orientated, so updates (create, edit) of data does not persist on the server
the client's correspondance with server is just the inial loading of all data
This is just for this demo!

1:45:00