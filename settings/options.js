const saveOptions = (event) => {
  const parseTabNames = (namesCsv) => (
    namesCsv.split(',').map(name => (
      name.trim().replace(/['"]+/g, '')
    )).filter(name => name)
  );

  event.preventDefault();
  browser.storage.local.set({
    tabNames: parseTabNames(document.querySelector('#tab-names').value)
  });
};

const restoreOptions = () => {
  const csvify = (array) => (
    array.map(elem => (
      (elem.indexOf(' ') > 0) ? `'${elem}'` : elem
    )).join(', ')
  );

  const setTabs = (tabs) => {
    const value = tabs ? csvify(tabs) : '';
    document.querySelector('#tab-names').value = value;
  };

  const errorHandler = (error) => {
    console.error('Error in Highlight Jenkins add-on: ', error);
  };

  browser.storage.local.get('tabNames')
    .then(({ tabNames }) => setTabs(tabNames))
    .catch(err => errorHandler(err));
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
