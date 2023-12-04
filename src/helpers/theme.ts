const toggleDarkClass = (condition: boolean) => {
  const body = document.body;

  if (condition) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
};

export { toggleDarkClass };
