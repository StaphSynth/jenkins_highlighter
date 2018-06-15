const tabs = document.querySelectorAll('.tabBarFrame .tabBar .tab a');

browser.storage.local.get('tabNames')
  .then(({ tabNames }) => {
    tabs.forEach(tab => {
      tabNames.forEach(name => {
        if (tab.text.toLowerCase() === name.toLowerCase()) {
          tab.style.backgroundColor = 'lightgreen';
        }
      });
    });
  })
  .catch(err => console.error('Error in Highlight Jenkins add-on: ', err));
