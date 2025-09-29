fetch('js/search.json')
    .then(response => response.json())
    .then(data => {
        const fuse = new Fuse(data, {keys: ['title', 'keywords'], threshold: 0.3 });
        document.getElementById("searchbox").addEventListener("input", function(){
            const results = fuse.search(this.value);
            document.getElementById("searchresults").innerHTML = results
            .map(r => `<a href="${r.item.link}">${r.item.title}</a>`)
            .join("<br>")

        });
    });

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }
});