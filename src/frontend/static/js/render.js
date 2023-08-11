
window.package.send('render', document.documentElement.innerHTML)
  
window.package.receive('contentRendered', (contentRendered) => {
    document.documentElement.innerHTML = contentRendered
    console.log('renderizado')
});